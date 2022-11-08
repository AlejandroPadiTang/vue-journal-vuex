export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum similique nam architecto tempore perferendis quia culpa quae distinctio explicabo error facilis porro iusto praesentium, aut tempora ab laudantium consequatur molestias.',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'nam architecto tempore perferendis quia culpa quae distinctio explicabo error facilis porro iusto praesentium, aut tempora ab laudantium consequatur molestias.',
            picture: null
        },
        {
            id: new Date().getTime() + 3000,
            date: new Date().toDateString(),
            text: 'quia culpa quae distinctio explicabo error facilis porro iusto praesentium, aut tempora ab laudantium consequatur molestias.',
            picture: null
        }
    ]
})