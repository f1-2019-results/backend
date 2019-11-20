type Projection<T> = {
    [key in keyof T]?: 1 | true;
}

export default Projection;
