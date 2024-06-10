// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Contract Address 0x3c13f4F98e94d19b73BB47b3eb1b42e14E75611b

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BATToken is ERC20, Ownable(msg.sender), ReentrancyGuard {
    mapping(address => uint256) public engagementScores;
    mapping(address => uint256) public referralScores;
    mapping(address => uint256) public leadGenerationScores;
    mapping(address => uint256) public viewScores;
    mapping(address => uint256) public contributionScores;

    event ScoreUpdated(address indexed user, string scoreType, uint256 score);
    event BATMinted(address indexed user, uint256 amount);

    constructor() ERC20("Basic Attention Token", "BAT") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    modifier validAddress(address user) {
        require(user != address(0), "Invalid address");
        _;
    }

    function setEngagementScore(address user, uint256 score)
        external
        onlyOwner
        validAddress(user)
    {
        engagementScores[user] = score;
        emit ScoreUpdated(user, "Engagement", score);
    }

    function setReferralScore(address user, uint256 score)
        external
        onlyOwner
        validAddress(user)
    {
        referralScores[user] = score;
        emit ScoreUpdated(user, "Referral", score);
    }

    function setLeadGenerationScore(address user, uint256 score)
        external
        onlyOwner
        validAddress(user)
    {
        leadGenerationScores[user] = score;
        emit ScoreUpdated(user, "Lead Generation", score);
    }

    function setViewScore(address user, uint256 score)
        external
        onlyOwner
        validAddress(user)
    {
        viewScores[user] = score;
        emit ScoreUpdated(user, "View", score);
    }

    function setContributionScore(address user, uint256 score)
        external
        onlyOwner
        validAddress(user)
    {
        contributionScores[user] = score;
        emit ScoreUpdated(user, "Contribution", score);
    }

    function mintBAT(address user)
        external
        onlyOwner
        nonReentrant
        validAddress(user)
    {
        uint256 totalScore = engagementScores[user] +
            referralScores[user] +
            leadGenerationScores[user] +
            viewScores[user] +
            contributionScores[user];

        require(totalScore > 0, "User has no scores to mint BAT.");

        uint256 amount = totalScore * 10**decimals();
        _mint(user, amount);
        emit BATMinted(user, amount);
    }

    function transferBAT(address recipient, uint256 amount) external {
        _transfer(msg.sender, recipient, amount);
    }

    function burnBAT(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
