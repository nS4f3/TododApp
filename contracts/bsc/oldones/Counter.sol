// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    int public counter;

    function Election () public {
        counter = 0;
    }

    function increment () public {
        counter += 1;
    }
}