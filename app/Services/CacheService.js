'use strict';

const Redis = use('Redis');

class CacheService {
  static getCache() {
    return Redis;
  }
}

module.exports = CacheService;
