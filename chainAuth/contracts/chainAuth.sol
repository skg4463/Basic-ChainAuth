pragma solidity ^0.5.0;

contract chainAuth {
    struct authDetail {
        string id;
        bool isExsit;
    }

    struct regDetail {
        //uint32 idIndex; 
        bool isReged;
        uint64 regTime;
    }

    //id+pass의 해시값 key => authDetail
    mapping(uint256 => authDetail) internal auth;

    //id => accountDetails[]
    mapping(string => regDetail) internal authinfo;

    event registration(string _id, uint64 regTime);
    event loginComfirm(string _id, uint64 loginTime);

    //id를 주고, 있으면 -> true
    function _isthere(string memory _id) internal view returns (bool) {
        return (authinfo[_id].isReged == true);
    }

    function _registration(uint256 _authHash, string memory _id) internal {
        regDetail memory _newAccount = regDetail({
            isReged : true,
            regTime : uint64(block.timestamp)
        });

        authDetail memory _newAuth = authDetail({
            id : _id,
            isExsit : true
        });

        authinfo[_id] = _newAccount;
        auth[_authHash] = _newAuth;

        emit registration(_id, _newAccount.regTime);
    }

    function requestLogin(uint256 _authHash) public returns (string memory) {
        authDetail memory ax = auth[_authHash];

        require(ax.isExsit == true,"This ID doesnt exist");
        emit loginComfirm(ax.id, uint64(block.timestamp));

        return ax.id;
    }

    function requestRegistration(uint256 _authHash, string memory _id) public returns (string memory) {
        require(!_isthere(_id),"This ID is being used by someone else");
        _registration(_authHash, _id);

        return _id;
    }

}