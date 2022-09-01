import alfred, {OutputItem} from "@liangshen/alfred";
import Youdao from "@liangshen/youdao";

const youdao = new Youdao({
    appSecret: alfred.env.get('appSecret')!,
    appKey: alfred.env.get('appKey')!
});
const res = await youdao.translate(alfred.input);

if (res.errorCode === '0') {
    // 过滤中文
    // let reg = /^[a-zA-Z ]/; // .filter(i => reg.test(i))
    // 标准翻译结果 : translation
    const translationItems = res.translation.map(i => ({
        title: i,
        subtitle: `translation: ${i}`,
        arg: i,
    }))
    // 网络翻译 : web
    const webItems = res.web?.flatMap(i => i.value).map(i => ({
        title: i,
        subtitle: `web: ${i}`,
        arg: i,
    })) || []
    const items: OutputItem[] = [
        ...translationItems,
        ...webItems
    ].map(i => {
        const ignoreWords = ['and', 'or', 'the', 'a', 'at', 'of','was' ];
        const deleteWords = ['ing', 'ed', 'ly']
        const strArr = i.title.toLowerCase().split(' ')
            .filter(m => !ignoreWords.includes(m)).map(i => {
                return deleteWords.reduce((p, v) => {
                    if (p.endsWith(v)) {
                        return p.slice(0, -v.length)
                    }
                    return p;
                }, i);
            });
        // df
        const bigHumpArr = [...strArr]
        const humpArr = [...strArr]
        for (let i = 0; i < strArr.length; i++) {
            if (i === 0) {
                humpArr[i] = humpArr[i].charAt(0).toLowerCase() + humpArr[i].substring(1);
            } else {
                humpArr[i] = humpArr[i].charAt(0).toUpperCase() + humpArr[i].substring(1);
            }
            bigHumpArr[i] = bigHumpArr[i].charAt(0).toUpperCase() + bigHumpArr[i].substring(1);
        }
        // df
        const bigHump = bigHumpArr.join('');
        // xt
        const hump = humpArr.join('');
        // zh
        const hyphen = strArr.join('-').toLowerCase();
        // xh
        const underline = strArr.join('_').toLowerCase();
        // cl
        const namedConst = strArr.join('_').toUpperCase()
        return {
            ...i,
            text: {
               copy: i.title,
               largetype: i.title
            },
            mods: {
                cmd: {
                    arg: hump,
                    subtitle: `驼峰式命名法 => ${hump}`,
                },
                alt: {
                    arg: bigHump,
                    subtitle: `帕斯卡命名法/大驼峰式命名法 => ${bigHump}`,
                },
                fn: {
                    arg: hyphen,
                    subtitle: `中划线命名法 => ${hyphen}`,
                },
                ctrl: {
                    arg: underline,
                    subtitle: `下划线命名法 => ${underline}`,
                },
                shift: {
                    arg: namedConst,
                    subtitle: `全大写下划线命名法/常量 => ${namedConst}`,
                },
            },
        }
    })
    const basic = res.basic;
    if (basic) {
        const text = basic.explains.join(', ');
        items.unshift({
            title: text,
            subtitle: `[${basic.phonetic}]${
                basic["us-phonetic"] ? ` us: [${basic["us-phonetic"]}]` : ''
            }${
                basic["uk-phonetic"] ? ` uk: [${basic["uk-phonetic"]}]` : ''
            }`,
            text: {
                largetype: text
            }
        });
    }
    alfred.output({items});
} else {
    alfred.output({
        items: [{
            title: 'Not Found',
            subtitle: `Not Found`,
            arg: 'error',
        }]
    });
}