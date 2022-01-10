// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.8.2;
pragma experimental ABIEncoderV2;

contract AnnouncementBoard {

    // Declare a struct type to present an Announcement which will be used as 
    // basic unit stored in smart contract.
    struct Announcement {
        address publisher;
        string content;
        uint nonce;
    }

    // Declare a number to cap the maximum amount of announcements allowed.
    uint private maxAnnouncementCount;

    // Declare a mapping to store announcements and a counter to tell how many
    // announcements are published, not including takendowns.
    uint private announcementCounter;
    mapping(uint => Announcement) private announcements;

    uint private takendownAnnouncementCounter;
    mapping(uint => Announcement) private takendownAnnouncements;

    event Announce(address publisher, string content, uint nonce);

    constructor(uint _maxAnnouncementCount) {
        maxAnnouncementCount = _maxAnnouncementCount;
        announcementCounter = 0;
        takendownAnnouncementCounter = 0;
    }

    function getAnnouncementsCount() public view returns (uint) {
        return announcementCounter;
    }

    function announce(string memory _announcement) public returns (uint) {
        uint nonce = announcementCounter + takendownAnnouncementCounter + 1;
        require(
            nonce <= maxAnnouncementCount,
            "Abort announcing...(Board has exceeded max limit)"
        );

        // Create and insert the announcement.
        Announcement memory value = 
            Announcement(msg.sender, _announcement, nonce);
        announcements[nonce] = value;

        // Increase the number of announcements created.
        announcementCounter++;

        // Return the key in the alive board.
        emit Announce(msg.sender, _announcement, nonce);
        return nonce;
    }

    function takedown(uint nonce) public {
        Announcement memory announcement = announcements[nonce];
        require(
            announcement.nonce > 0,
            "Attest that announcement is still alive"
        );
        
        // Remove the announcement from alive board.
        delete announcements[nonce];
        announcementCounter--;

        // Add the announcement to the takendown board.
        takendownAnnouncements[nonce] = announcement;
        takendownAnnouncementCounter++;
    }

    function getAliveAnnouncements()
        external
        view
        returns (address[] memory, string[] memory, uint[] memory)
    {
        address[] memory publisherList = new address[](announcementCounter);
        string[] memory contentList = new string[](announcementCounter);
        uint[] memory nonceList = new uint[](announcementCounter);
        uint totalCounter = 
            announcementCounter + takendownAnnouncementCounter;
        uint aliveIdx = 0;
        for (uint i=1; i <= totalCounter; i++) {
            Announcement memory ann = announcements[i];
            if (ann.nonce > 0 && ann.nonce == i) {
                publisherList[aliveIdx] = ann.publisher;
                contentList[aliveIdx] = ann.content;
                nonceList[aliveIdx] = ann.nonce;
                aliveIdx++;
            }
        }
        return (publisherList, contentList, nonceList);
    }
}