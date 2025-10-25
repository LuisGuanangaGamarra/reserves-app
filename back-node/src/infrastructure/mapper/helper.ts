import { forMember, mapFrom } from '@automapper/core';

const mapProps = <TSrc, TDest >(
    props: (keyof TSrc & keyof TDest)[]
) => {
    return props.map((prop) =>
        forMember(
            (d: any) => d[prop],
            mapFrom((s: any) => s[prop])
        )
    );
}

export default mapProps;