import test from 'blue-tape';
import Redis from '../lib/index.js';
import RedisServer from 'redis'
import config from './test-config.js';


test('test query',  async t => {

	const activity = new Redis();
	
	const task = {};
	const result = await activity.runQuery(config.query, config.connection);
	
	result.on('data', (data) =>{
		t.comment(data.toString());
		t.ok(result, "request succeeded");
	});
			  

});


