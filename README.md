# RoundRobin List

round-robin list is a Weighted Round Robin resource pool with the possibility to select the starting resource 

## Using

```
npm install roundrobin-list
```

#### Basic usage

```javascript
const { RoundRobinList } = require('roundrobin-list');

// Without initial values
const listWithoutValues = new RoundRobinList();

listWithoutValues.add({ value: 'A', weight: 3 });
listWithoutValues.add({ value: 'B', weight: 2 });
listWithoutValues.add({ value: 'C', weight: 2 });

// With values 
const listWithValues = new RoundRobinList([
    { value: 'A', weight: 4 },
    { value: 'B', weight: 3 },
    { value: 'C', weight: 2 },
]);
```

## License
MIT
