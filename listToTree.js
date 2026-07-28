const nodes = [
    { id: 1, parentId: null, name: 'Root' },
    { id: 2, parentId: 1, name: 'Child 1' },
    { id: 3, parentId: 1, name: 'Child 2' },
    { id: 4, parentId: 2, name: 'Grandchild 1' },
    { id: 5, parentId: 2, name: 'Grandchild 2' }
];
const res = []
const obj = {}
nodes.forEach(nodeInfo => {
    if (nodeInfo.parentId == null) {
        res.push(nodeInfo)
    }
    obj[nodeInfo.id] = nodeInfo
})
nodes.forEach(nodeInfo => {
    const pId = nodeInfo.parentId
    if (pId) {
        if(!obj[pId].children) {
            obj[pId].children = []
        }
        obj[pId].children.push(nodeInfo)
    }
})
console.log('res',res)