var request = require('request'); 
var qs      = require('querystring'); 
var extend  = require('util')._extend; 
var Promise = require('bluebird'); 

var Api = function(config){
    this._baseUrl     = config.baseUrl || 'https://api.vk.com/method'; 
    this._appId       = config.appId; 
    this._appSecret   = config.appSecret; 
    this._accessToken = config.accessToken || config.token; 
    this._apiVersion  = config.apiVersion || '5.39'; 
}; 

Api.prototype.call = function(method, params, callback){
    extend(params, {
        access_token: this._accessToken, 
        v: this._apiVersion
    }); 
    var query = qs.stringify(params); 
    var url = [this._baseUrl, [method, query].join('?')].join('/'); 
    var self = this; 
    if( ! callback ) {
        return new Promise(function(resolve, reject){
            self._request(url, function(err, data){
                if( err ) return reject(err); 
                resolve(data); 
            }); 
        }); 
    }
}; 

Api.prototype._request = function(url, callback){
    request.get(url, function(err, response, body){
        if(err || response.statusCode != 200) return callback('ERROR'); 
        try{
            var data = JSON.parse(body); 
            
            if( ! data ) 
                return callback('empty response'); 
                
            if( data.error )
                return callback(data.error); 
            
            callback(null, data.response);  
            
        }catch(e){
            callback(e); 
        }
        
    }); 
}; 

module.exports = Api; 