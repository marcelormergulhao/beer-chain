pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'BreweryRole' to manage this role - add, remove, check
contract BreweryRole {
 
  // Define 2 events, one for Adding, and other for Removing
    event BreweryAdded(address indexed account);
    event BreweryRemoved(address indexed account);
  // Define a struct 'breweries' by inheriting from 'Roles' library, struct Role
    Roles.Role private breweries;

  // In the constructor make the address that deploys this contract the 1st Brewery
    constructor() public {
        _addBrewery(msg.sender);
    }

  // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyBrewery() {
        require(isBrewery(msg.sender));
        _;
    }

  // Define a function 'isBrewery' to check this role
    function isBrewery(address account) public view returns (bool) {
        return Roles.has(breweries, account);
    }

  // Define a function 'addBrewery' that adds this role
    function addBrewery(address account) public onlyBrewery {
        _addBrewery(account);
    }

  // Define a function 'renounceBrewery' to renounce this role
    function renounceBrewery() public {
        _removeBrewery(msg.sender);
    }

  // Define an internal function '_addBrewery' to add this role, called by 'addBrewery'
    function _addBrewery(address account) internal {
        Roles.add(breweries, account);
        emit BreweryAdded(account);
    }

  // Define an internal function '_removeBrewery' to remove this role, called by 'removeBrewery'
    function _removeBrewery(address account) internal {
        Roles.remove(breweries, account);
        emit BreweryRemoved(account);
    }
}