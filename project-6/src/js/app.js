App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    brewerID: "0x0000000000000000000000000000000000000000",
    distributorID: "0x0000000000000000000000000000000000000000",
    supermarketID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.supermarketID = $("#supermarketID").val();
        App.consumerID = $("#consumerID").val();

        App.brewerID = $("#brewerID").val();
        App.beer_upc = $("#beer-upc").val();
        App.hops_upc = $("#hops-upc").val();
        App.barley_upc = $("#barley-upc").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originFarmerID,
            App.originFarmName,
            App.originFarmInformation,
            App.originFarmLatitude,
            App.originFarmLongitude,
            App.productNotes,
            App.productPrice,
            App.distributorID,
            App.supermarketID,
            App.consumerID,
            App.brewerID,
            App.beer_upc,
            App.hops_upc,
            App.barley_upc
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function (err, res) {
            if (err) {
                console.log('Error:', err);
                return;
            }
            console.log('getMetaskID:', res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain = 'build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function (data) {
            console.log('data', data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function (event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);

        switch (processId) {

            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.maltBarley(event);
                break;
            case 3:
                return await App.processItem(event);
                break;
            case 4:
                return await App.processBarley(event);
                break;
            case 5:
                return await App.packItem(event);
                break;
            case 6:
                return await App.sellItem(event);
                break;
            case 7:
                return await App.buyItem(event);
                break;
            case 8:
                return await App.shipItem(event);
                break;
            case 9:
                return await App.receiveItem(event);
                break;
            case 10:
                return await App.brewBeer(event);
                break;
            case 11:
                return await App.bottleBeer(event);
                break;
            case 12:
                return await App.storeBeer(event);
                break;
            case 13:
                return await App.sellBeer(event);
                break;
            case 14:
                return await App.buyBeer(event);
                break;
            case 15:
                return await App.shipBeer(event);
                break;
            case 16:
                return await App.supermarketSell(event);
                break;
            case 17:
                return await App.purchaseBeer(event);
                break;
            case 18:
                return await App.fetchItemBufferOne(event);
                break;
            case 19:
                return await App.fetchItemBufferTwo(event);
                break;
            case 20:
                return await App.fetchItemBufferThree(event);
                break;
            case 21:
                return await App.fetchBeerBufferOne(event);
                break;
            case 22:
                return await App.fetchBeerBufferTwo(event);
                break;
        }
    },

    harvestItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.harvestItem(
                App.upc,
                App.metamaskAccountID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes
            );
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('harvestItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    maltBarley: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.maltBarley(App.upc, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('maltBarley', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.processItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('processItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    processBarley: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.processBarley(App.upc, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('processBarley', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.packItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('packItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const productPrice = web3.toWei(0.001, "ether");
            console.log('productPrice', productPrice);
            return instance.sellItem(App.upc, App.productPrice, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('sellItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upc, { from: App.metamaskAccountID, value: walletValue });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('buyItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.shipItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('shipItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('receiveItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    brewBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.brewBeer(App.upc, App.barley_upc, App.hops_upc, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('brewBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    bottleBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.bottleBeer(App.beer_upc, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('bottleBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    storeBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            //Assume metamask account as distributor to enable the rest of the chain
            return instance.storeBeer(App.beer_upc, App.metamaskAccountID, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('storeBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    sellBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            //Assume metamask account as distributor to enable the rest of the chain
            const beerPrice = web3.toWei(0.001, "ether");
            return instance.sellBeer(App.beer_upc, beerPrice, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('sellBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    buyBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            //Assume metamask account as distributor to enable the rest of the chain
            const walletValue = web3.toWei(3, "ether");
            return instance.buyBeer(App.beer_upc, {from: App.metamaskAccountID, value: walletValue})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('buyBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    shipBeer: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.shipBeer(App.beer_upc, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('shipBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    supermarketSell: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const productPrice = web3.toWei(0.002, "ether");
            return instance.supermarketSell(App.beer_upc, productPrice, {from: App.metamaskAccountID})
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('supermarketSell', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    purchaseBeer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.purchaseBeer(App.beer_upc, { from: App.metamaskAccountID, value: walletValue});
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('purchaseBeer', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferOne(App.upc);
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('fetchItemBufferOne', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('fetchItemBufferTwo', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferThree: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferThree(App.upc);
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('fetchItemBufferThree', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchBeerBufferOne: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchBeerBufferOne(App.beer_upc);
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('fetchBeerBufferOne', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchBeerBufferTwo: function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchBeerBufferTwo(App.beer_upc);
        }).then(function (result) {
            $("#ftc-item").text(result);
            console.log('fetchBeerBufferTwo', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                    App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        App.contracts.SupplyChain.deployed().then(function (instance) {
            var events = instance.allEvents(function (err, log) {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
        }).catch(function (err) {
            console.log(err.message);
        });

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});