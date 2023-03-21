import md5 from "js-md5"
import nodeMailer from 'nodemailer'

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