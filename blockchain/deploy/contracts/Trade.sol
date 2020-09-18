pragma solidity 0.5.6;

interface IToken7 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function balanceOf(address who) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function _approve(address ca, address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IToken17 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function getSalePrice(uint256 tokenId) external view returns (uint256);
    function getIsPaid(uint256 tokenId) external view returns (bool);
    function setIsPaidTrue(uint256 tokenId) external;
    function setIsPaidFalse(uint256 tokenId) external;
    
}

contract Trade {
    address owner;
    IToken7 _token7Address;
    IToken17 _token17Address;
    address _token17ReceiveAdr;
    
    mapping (address => mapping (uint256 => uint256)) private enrolledToken7;
    mapping (uint256 => address) private buyer;
    mapping (address => uint256[]) private enrolledToken17;
    mapping (uint256 => address) private tokenOwner;
    
    constructor(IToken7 token7Adr, IToken17 token17Adr, address _token17RecAdr) public {
        owner = msg.sender;
        _token7Address = token7Adr;
        _token17Address = token17Adr;
        _token17ReceiveAdr = _token17RecAdr;
    }
    
    modifier approvedToken17ownerCheck(uint256 tokenId) {
        require(_token17Address.ownerOf(tokenId) == msg.sender);
        _;
    }
    
    modifier approvedCheck(uint256 tokenId) {
        require(_token17Address.getApproved(tokenId) == msg.sender);
        _;
    }
    
    function totalBalanceOfCA() public view returns (uint256, uint256) {
        uint256 balance7 = _token7Address.balanceOf(address(this));
        uint256 balance17 = _token17Address.balanceOf(address(this));
        return (balance7, balance17);
    }
    
    function purchase(uint256 tokenId, uint256 value) public returns (bool) {
        require(_token17Address.getIsPaid(tokenId) == false);
        uint256 salePrice =  _token17Address.getSalePrice(tokenId);
        require(salePrice == value);
        _token7Address.transferFrom(msg.sender, address(this), value);
        enrolledToken7[msg.sender][tokenId] += value;
        _token17Address.setIsPaidTrue(tokenId);
        buyer[tokenId] = msg.sender;
    }
    
    function cancelPurchase(uint256 tokenId) public {
        uint256 salePrice =  _token17Address.getSalePrice(tokenId);
        uint256 value = enrolledToken7[msg.sender][tokenId];
        require(value == salePrice);
        _token7Address.transfer(msg.sender, value);
        _token17Address.setIsPaidFalse(tokenId);
        enrolledToken7[msg.sender][tokenId] = 0;
        buyer[tokenId] = address(0);
    }
    
    function tradeEnd(uint256 tokenId) public {
        address seller = _token17Address.ownerOf(tokenId);
        uint256 salePrice =  _token17Address.getSalePrice(tokenId);
        _token7Address.transfer(seller, salePrice);
    }
    
    function getPurchaseList(uint256 tokenId) public view returns (uint256) {
        uint256 value = enrolledToken7[msg.sender][tokenId];
        return value;
    }
    
    function getBuyerAdr(uint256 tokenId) public view returns (address) {
        return buyer[tokenId];
    }
    
    function msgSenderTest() public view returns (address) {
        return msg.sender;
    }
    
}








