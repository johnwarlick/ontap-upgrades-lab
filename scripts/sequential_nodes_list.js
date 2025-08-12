// Takes the Ansible return from get_ha_pairs playbook with the hostname as the top level key
// of a list of ha pairs. Returns flattened sequential list of {cluster:node} objects 
// 
// ha_pairs = {
//     'drfna01':[
//         ['DRFNA01A', 'DRFNA01B'],
//     ], 
//     'dgtcna01':[
//         ['DGTCNA01A', 'DGTCNA01B'], 
//         ['DGTCNA01C', 'DGTCNA01D'],
//     ],
// };
// 
// 
// sequential_nodes_list = [
//     [ { drfna01: 'DRFNA01A' }, { dgtcna01: 'DGTCNA01A' } ],
//     [ { drfna01: 'DRFNA01B' }, { dgtcna01: 'DGTCNA01B' } ],
//     [ { dgtcna01: 'DGTCNA01C' } ],
//     [ { dgtcna01: 'DGTCNA01D' } ]
// ];

sequential_nodes_list = [];

//loop through ha_pairs and set i to 0 for each cluster
for (const cluster of ha_pairs.keySet()) {
    pairs_list = ha_pairs.get(cluster);
    i = 0;

    pairs_list.forEach(function(pair){

        pair.forEach(function(node){
            // if we don't have an array at the current index yet, create an empty one
            if(typeof sequential_nodes_list[i] === 'undefined') {
                sequential_nodes_list[i] = {}
            } 

            // create a cluster:node object and insert into the current index
            // obj = {};
            // obj[cluster]=node;
            
            sequential_nodes_list[i][cluster]=node //.push(obj);
            
            // iterate i to get proper array index 
            i++;
        });
    });
}

// return variable to concord
execution.variables().set('sequential_nodes_list', sequential_nodes_list);
