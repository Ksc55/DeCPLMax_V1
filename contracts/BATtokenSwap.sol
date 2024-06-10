// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract BATSwap {
    address public immutable batToken; // Address of the BAT token contract
    address public immutable uniswapRouter; // Address of the Uniswap router contract
    address public immutable weth; // Address of Wrapped Ether (WETH) contract

    constructor(
        address _batToken,
        address _uniswapRouter,
        address _weth
    ) {
        batToken = _batToken;
        uniswapRouter = _uniswapRouter;
        weth = _weth;
    }

    function swapBATForETH(uint256 amountIn) external {
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
            msg.sender, // Send ETH to the sender
            block.timestamp // Deadline for the swap
        );

        emit BATSwappedForETH(msg.sender, amountIn, 0); // Here, 0 is a placeholder for the amountOut
    }

    function swapBATForToken(
        uint256 amountIn,
        address tokenOut,
        uint256 deadline
    ) external {
        // Approve the Uniswap router to spend BAT tokens on behalf of the sender
        IERC20(batToken).approve(uniswapRouter, amountIn);

        // Specify the token swap path: BAT -> WETH -> TokenOut
        address[] memory path = new address[](3);
        path[0] = batToken;
        path[1] = weth;
        path[2] = tokenOut;

        // Perform the token swap through Uniswap
        IUniswapV2Router02(uniswapRouter).swapExactTokensForTokens(
            amountIn,
            0, // Accept any amount of tokenOut
            path,
            msg.sender, // Send tokenOut to the sender
            deadline // Deadline for the swap
        );

        emit BATSwappedForToken(msg.sender, amountIn, tokenOut);
    }

    function swapTokenForBAT(
        uint256 amountIn,
        address tokenIn,
        uint256 deadline
    ) external {
        // Approve the Uniswap router to spend tokenIn tokens on behalf of the sender
        IERC20(tokenIn).approve(uniswapRouter, amountIn);

        // Specify the token swap path: tokenIn -> WETH -> BAT
        address[] memory path = new address[](3);
        path[0] = tokenIn;
        path[1] = weth;
        path[2] = batToken;

        // Perform the token swap through Uniswap
        IUniswapV2Router02(uniswapRouter).swapExactTokensForTokens(
            amountIn,
            0, // Accept any amount of BAT
            path,
            msg.sender, // Send BAT to the sender
            deadline // Deadline for the swap
        );

        emit TokenSwappedForBAT(msg.sender, amountIn, tokenIn);
    }

    function getBATBalance() external view returns (uint256) {
        return IERC20(batToken).balanceOf(address(this));
    }

    function getETHBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawETH(uint256 amount) external {
        require(amount <= address(this).balance, "Insufficient ETH balance");
        payable(msg.sender).transfer(amount);
    }

    function emergencyStop() external {
        // Implement emergency stop mechanism (if needed)
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
        address tokenOut
    );
    event TokenSwappedForBAT(
        address indexed sender,
        uint256 amountIn,
        address tokenIn
    );
}
