import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import style from '@/styles/plate/Editer.module.scss'
import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import('@wangeditor/editor-for-react').then(mod => mod.Editor), { ssr: false })
const MyToolBar = dynamic(() => import('@wangeditor/editor-for-react').then(mod => mod.Toolbar), { ssr: false })

export default forwardRef((props, ref): JSX.Element => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    const [html, setHtml] = useState('<p>hello</p>')

    useImperativeHandle(ref, () => ({
        getValue() {
            return html
        }
    }))

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        autoFocus: false,
        MENU_CONF: {
            uploadImage: {
                fieldName: 'file',
                server: '/api/upload/image'
            },
            uploadVideo: {
                fieldName: 'file',
                server: '/api/upload/video',
                maxFileSize: 30 * 1024 * 1024,
            }
        }
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div className={style['editor']}>
            <MyToolBar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                className={style['editor-tool']}
            />
            <MyEditor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                className={style['editor-content']}
            />
        </div>
    )
})