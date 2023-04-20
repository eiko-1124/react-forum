import md5 from "js-md5"
import nodeMailer from 'nodemailer'

type rankingSite = {
    iid: string,
    title: string,
    vSum: number,
    rSum: number,
    lSum: number,
    cSum: number,
    date: Date,
    score?: number
}

export const createId = (): string => {
    const time = new Date().getTime()
    return md5(time + Math.floor(Math.random() * 1024) + '')
}

export const sendEmail = async (title: string, text: string, to: string): Promise<boolean> => {
    let transporter = nodeMailer.createTransport({
        service: '163',
        secure: true,
        auth: {
            user: 'lysmane@163.com',
            pass: 'OEWIIYYAKYAKSRAG'
        }
    })

    let options = {
        from: 'lysmane@163.com',
        to: to,
        subject: title,
        text: text
    }

    try {
        await new Promise<void>((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if (err) reject(err)
                else {
                    resolve()
                }
            })
        })
    } catch (error) {
        console.log(error)
        return false
    }
    return true
}

export const ranking = (arr: rankingSite[]) => {
    const now = new Date().getTime();
    for (let site of arr) {
        const diff: number = now - site.date.getTime();
        const decay: number = Math.exp(-diff / 86400000);
        const score: number = site.vSum * 1 + site.lSum * 4 + site.cSum * 4 + site.rSum * 2
        site.score = score * decay
    }
    const res = []
    for (let i = 0; arr.length > 0 && i < 10; i++) {
        let index = 0
        for (let j = 1; j < arr.length; j++) {
            if (arr[j].score > arr[index].score) index = j
        }
        res.push(arr[index])
        arr.splice(index, 1)
    }
    return res
}