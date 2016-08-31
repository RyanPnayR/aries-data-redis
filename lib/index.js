import { Activity, singleS3StreamOutput } from 'aries-data';
import RedisServer from 'redis'
export default class Redis extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version
    };

    constructor() {
        super();
        // initialize any instance variables here
    }
	
	@singleS3StreamOutput('json')
	async onTask(activityTask, config) {
    	return this.runQuery(config.query, config.connection);
    };
	
	async runQuery(query,connection) {
		const client = RedisServer.createClient(connection.port,connection.host);
		
		var stream1 = client.stream.on('connect', () => {
			client.send_command(query.command,query.aListofArguements);
		});
		
		return stream1;
	};
};
 