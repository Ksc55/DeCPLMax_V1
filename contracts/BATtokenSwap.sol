// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract BATSwap {
    address public immutable batToken; // Address of the BAT token contract 0x39bADb565B5AEe66B056B2b9eb87EF56c9D460A8
    address public immutable uniswapRouter; // Address of the Uniswap router contract 0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45
    address public immutable weth; // Address of Wrapped Ether (WETH) contract  0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
    bool public emergencyStopped; // Emergency stop flag

    constructor(
        address _batToken,
        address _uniswapRouter,
        address _weth
    ) {
        batToken = _batToken;
        uniswapRouter = _uniswapRouter;
        weth = _weth;
        emergencyStopped = false; // Initialize emergency stop as not active
    }

    modifier onlyUnpaused() {
        require(!emergencyStopped, "Contract is paused");
        _;
    }

    function swapBATForETH(uint256 amountIn) external onlyUnpaused {
        // Approve the Uniswap router to spend BAT tokens on behalf of the sender
        IERC20(batToken).approve(uniswapRouter, amountIn);

        // Specify the token swap path: BAT -> WETH -> ETH
        address[] memory path = new address[](2);
        path[0] = batToken;
        path[1] = weth;

        // Perform the token swap through Uniswap
        IUniswapV2Router02(uniswapRouter).swapExactTokensForETH(
            amountIn,
            0, // Accept any amount of ETH
            path,
            address(this), // Send ETH to this contract
            block.timestamp // Deadline for the swap
        );

        emit BATSwappedForETH(msg.sender, amountIn, 0); // Here, 0 is a placeholder for the amountOut
    }

    function swapBATForToken(uint256 amountIn, address tokenOut, uint256 deadline) external onlyUnpaused {
        // Approve the Uniswap router to spend BAT tokens on behalf of the sender
        IERC20(batToken).approve(uniswapRouter, amountIn);

        // Specify the token swap path: BAT -> WETH -> TokenOut
        address[] memory path = new address[](2);
        path[0] = batToken;
        path[1] = weth;

        // Perform the token swap through Uniswap
        IUniswapV2Router02(uniswapRouter).swapExactTokensForTokens(
            amountIn,
            0, // Accept any amount of tokensOut
            path,
            tokenOut, // Send tokensOut to this contract
            deadline // Deadline for the swap
        );

        emit BATSwappedForToken(msg.sender, amountIn, 0); // Here, 0 is a placeholder for the amountOut
    }

    function swapTokenForBAT(
        uint256 amountIn,
        address tokenIn,
        uint256 deadline
    ) external onlyUnpaused {
        // Approve the Uniswap router to spend tokenIn tokens on behalf of the sender
        IERC20(tokenIn).approve(uniswapRouter, amountIn);

        // Specify the token swap path: tokenIn -> WETH -> BAT
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = weth;

        // Perform the token swap through Uniswap
        IUniswapV2Router02(uniswapRouter).swapExactTokensForTokens(
            amountIn,
            0, // Accept any amount of BAT
            path,
            batToken, // Send BAT to this contract
            deadline // Deadline for the swap
        );

        emit TokenSwappedForBAT(msg.sender, amountIn, 0); // Here, 0 is a placeholder for the amountOut
    }

    function getBATBalance() external view returns (uint256) {
        return IERC20(batToken).balanceOf(address(this));
    }

    function getETHBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawETH(uint256 amount) external onlyUnpaused {
        require(amount <= address(this).balance, "Insufficient ETH balance");
        payable(msg.sender).transfer(amount);
    }

    function emergencyStop() external {
        require(msg.sender == owner(), "Only contract owner can call emergencyStop");
        emergencyStopped = !emergencyStopped; // Toggle emergency stop status
    }

    function owner() private view returns (address) {
        return address(uint160(uniswapRouter));
    }

    // Events
    event BATSwappedForETH(
        address indexed sender,
        uint256 amountIn,
        uint256 amountOut
    );
    event BATSwappedForToken(
        address indexed sender,
        uint256 amountIn,
        uint256 amountOut
    );
    event TokenSwappedForBAT(
        address indexed sender,
        uint256 amountIn,
        uint256 amountOut
    );
}
