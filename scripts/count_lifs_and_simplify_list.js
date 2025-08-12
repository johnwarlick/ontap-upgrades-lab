var totalCount = 0;
var allLifs = [];
      
for (var hostname in ansible_lifs_to_process) {
    var lifsList = ansible_lifs_to_process[hostname];
    if (Array.isArray(lifsList)) {
        lifsList.forEach(function(lif) {
            if (lif && lif.name && lif.ip && lif.ip.address) {
                allLifs.push(lif.name + ":" + lif.ip.address);
            }
        });
        totalCount += lifsList.length;
    }
}
      
execution.variables().set("lifs_count", totalCount);
execution.variables().set("simplified_lifs_list", allLifs);