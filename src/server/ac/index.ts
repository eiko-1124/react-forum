import { join } from "path";

class ACNode {
    public isEnd: boolean;
    public fail: ACNode | null;
    public children: Map<string, ACNode>;
    public start: number | null;
    public end: number | null;

    constructor() {
        this.isEnd = false;
        this.fail = null;
        this.children = new Map();
        this.start = null;
        this.end = null;
    }
}

class AC {
    private root: ACNode;

    constructor(words: string[]) {
        this.root = new ACNode();
        this.buildTrie(words);
        this.buildFail();
    }

    private buildTrie(words: string[]) {
        for (const word of words) {
            let node = this.root;
            for (const char of word) {
                if (!node.children.has(char)) {
                    node.children.set(char, new ACNode());
                }
                node = node.children.get(char)!;
            }
            node.isEnd = true;
            node.end = word.length - 1;
        }
    }

    private buildFail() {
        const queue: ACNode[] = [];
        this.root.fail = null;
        this.root.children.forEach((node) => {
            node.fail = this.root;
            queue.push(node);
        });

        while (queue.length > 0) {
            const node = queue.shift()!;
            node.children.forEach((child, char) => {
                let failNode = node.fail;
                while (failNode !== null && !failNode.children.has(char)) {
                    failNode = failNode.fail;
                }
                if (failNode === null) {
                    child.fail = this.root;
                } else {
                    child.fail = failNode.children.get(char)!;
                }
                queue.push(child);
            });
            if (node.fail !== null && node.isEnd) {
                node.start = node.end! - (node.end! - node.start! + 1);
            } else {
                node.start = node.fail?.start!;
            }
        }
    }

    public search(text: string): [number, number][] {
        const result: [number, number][] = [];
        let node = this.root;
        for (let i = 0; i < text.length; i++) {
            while (node !== null && !node.children.has(text[i])) {
                node = node.fail!;
            }
            if (node === null) {
                node = this.root;
            } else {
                node = node.children.get(text[i])!;
                if (node.isEnd) {
                    const startPos = i - (node.end! - node.start!);
                    result.push([startPos + 1, i + 1]);
                }
            }
        }
        return result;
    }

    replace(text: string): string {
        const mate: Array<Array<number>> = this.search(text)
        if (mate.length === 0) return text
        else {
            const res = text.split('')
            for (let i = 0; i < mate.length; i++) {
                for (let j = mate[i][0]; j < mate[i][1]; j++) {
                    res[j] = '*'
                }
            }
            return res.join('')
        }
    }
}

const fs = require('fs');
const sensitiveWords = fs.readFileSync(join(__dirname, '../../public/txt/key.txt'), 'utf-8').split('|');
const ac = new AC(sensitiveWords);

export default ac