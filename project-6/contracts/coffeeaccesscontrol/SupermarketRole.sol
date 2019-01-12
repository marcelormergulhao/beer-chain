pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'SupermarketRole' to manage this role - add, remove, check
contract SupermarketRole {

  // Define 2 events, one for Adding, and other for Removing
  event SupermarketAdded(address indexed account);
  event SupermarketRemoved(address indexed account);

  // Define a struct 'supermarkets' by inheriting from 'Roles' library, struct Role
  Roles.Role private supermarkets;

  // In the constructor make the address that deploys this contract the 1st supermarket
  constructor() public {
    _addSupermarket(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlySupermarket() {
    require(isSupermarket(msg.sender));
    _;
  }

  // Define a function 'isSupermarket' to check this role
  function isSupermarket(address account) public view returns (bool) {
    return Roles.has(supermarkets, account);
  }

  // Define a function 'addSupermarket' that adds this role
  function addSupermarket(address account) public onlySupermarket {
    _addSupermarket(account);
  }

  // Define a function 'renounceSupermarket' to renounce this role
  function renounceSupermarket() public {
    _removeSupermarket(msg.sender);
  }

  // Define an internal function '_addSupermarket' to add this role, called by 'addSupermarket'
  function _addSupermarket(address account) internal {
    Roles.add(supermarkets, account);
    emit SupermarketAdded(account);
  }

  // Define an internal function '_removeSupermarket' to remove this role, called by 'removeSupermarket'
  function _removeSupermarket(address account) internal {
    Roles.remove(supermarkets, account);
    emit SupermarketRemoved(account);
  }
}