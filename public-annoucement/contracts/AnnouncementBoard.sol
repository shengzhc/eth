// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract AnnouncementBoard is owned {

    // Declare a struct type to present an Announcement which will be used as 
    // basic unit stored in smart contract.
    struct Announcement {
        address publisher;
        string content;
    }

    uint private maxAnnouncementCount;
    Announcement[] public announcements;

    constructor(uint _maxAnnouncementCount) {
        maxAnnouncementCount = _maxAnnouncementCount;
    }

    function announce(string memory _announcement) public {
        require(
            announcements.length < maxAnnouncementCount,
            "Abort announcing...(Board has exceeded max limit)"
        );

        announcements.push(Announcement(msg.sender, _announcement));
    }
}