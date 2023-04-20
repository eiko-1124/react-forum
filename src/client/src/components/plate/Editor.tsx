import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import style from '@/styles/plate/Editer.module.scss'
import dynamic from 'next/dynamic'
import { getCookie } from '@/core/utils'

const MyEditor = dynamic(() => import('@wangeditor/editor-for-react').then(mod => mod.Editor), { ssr: false })
const MyToolBar = dynamic(() => import('@wangeditor/editor-for-react').then(mod => mod.Toolbar), { ssr: false })

export default forwardRef(({ excludeKeys, styles }: { excludeKeys: string[], styles: { height: string, maxHeight: string } }, ref): JSX.Element => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    const [html, setHtml] = useState('')

    useImperativeHandle(ref, () => ({
        getValue() {
            return html
        },
        clear() {
            setHtml('')
        }
    }))

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys
    }

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        autoFocus: false,
        MENU_CONF: {
            uploadImage: {
                fieldName: 'file',
                server: '/api/admin/upload/image',
                headers: {
                    Authorization: getCookie('token')
                }
            },
            uploadVideo: {
                fieldName: 'file',
                server: '/api/admin/upload/video',
                maxFileSize: 30 * 1024 * 1024,
                headers: {
                    Authorization: getCookie('token')
                }
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
        <div className={style['editor']}
            style={{ ...styles }}>
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