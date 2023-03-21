import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import style from '@/styles/plate/Editer.module.scss'

function MyEditor() {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
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
        <>
            <div className={style['editor']}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    className={style['editor-tool']}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    className={style['editor-content']}
                />
            </div>
        </>
    )
}

export default MyEditor