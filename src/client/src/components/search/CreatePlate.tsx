import style from '@/styles/search/CreatePlate.module.scss'
import { Button, Divider, Input, Radio, Textarea, Upload } from 'tdesign-react'
import useCreatePlate from '@/core/search/useCreatePlate'

export default function CreatePlate(): JSX.Element {

    const { uploadRef, state, setState, methods } = useCreatePlate()


    return (
        <div className={style['craetePlate']}>
            <div className={style['craetePlate-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['craetePlate-horizontal']}
                >新建板块</Divider>
            </div>
            <div>
                <div className={style['craetePlate-input']}><label>板块名:</label>
                    <Input value={state.name} onChange={(val) => setState.setName(val)}></Input></div>
                <div className={style['craetePlate-input']}><label>分类:</label><Radio.Group variant="primary-filled" defaultValue="技术" value={state.tag} onChange={(val: string) => setState.setTag(val)}>
                    <Radio.Button value="技术">技术</Radio.Button>
                    <Radio.Button value="日常">日常</Radio.Button>
                    <Radio.Button value="游戏">游戏</Radio.Button>
                    <Radio.Button value="小说">小说</Radio.Button>
                    <Radio.Button value="体育">体育</Radio.Button>
                    <Radio.Button value="音乐">音乐</Radio.Button>
                    <Radio.Button value="电影">电影</Radio.Button>
                    <Radio.Button value="动漫">动漫</Radio.Button>
                </Radio.Group></div>
                <div className={style['craetePlate-input']}>
                    <label>头像:</label>
                    <Upload
                        ref={uploadRef}
                        files={state.file}
                        onChange={setState.setFile}
                        theme={"image"}
                        accept="image/*"
                        autoUpload={false}
                    />
                </div>
                <div className={style['craetePlate-input']}><label>简介:</label>
                    <Textarea value={state.introduction} onChange={(val) => setState.setIntroduction(val)} autosize={{ minRows: 3, maxRows: 5 }} maxLength={200}></Textarea>
                </div>
                <div className={style['craetePlate-input']}><Button className={style['craetePlate-input']} onClick={methods.createNewPlate}>创建</Button></div>
            </div>
        </div>
    )
}
