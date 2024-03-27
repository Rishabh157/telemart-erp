/// ==============================================
// Filename:ATMHTMLEditor.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { getDefaultKeyBinding, RichUtils } from 'draft-js'
import { ErrorMessage } from 'formik'

// |-- Internal Dependencies --|
import 'src/App.css'

// |-- Types --|
type Props = {
    name: string
    value: any
    onChange: (newValue: any) => void
}

const uploadImageCallBack = (file: any) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image')
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca')
        const data = new FormData() // eslint-disable-line no-undef
        data.append('image', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
        })
        xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText)
            reject(error)
        })
    })
}

const ATMHTMLEditor = ({ name, value, onChange }: Props) => {
    const onHandleKeyBindings = (e: any) => {
        if (e.keyCode === 9) {
            onChange(RichUtils.onTab(e, value, 4))
        } else {
            return getDefaultKeyBinding(e)
        }
    }

    return (
        <div className="relative">
            <Editor
                editorState={value}
                onEditorStateChange={(newValue) => onChange(newValue)}
                toolbarClassName="toolbarclassName="
                wrapperClassName="wrapperclassName=  "
                editorClassName="editorclassName= px-3 border min-h-[180px]"
                onTab={onHandleKeyBindings}
                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        alt: { present: true, mandatory: true },
                    },
                }}
                placeholder="Write script here..."
            />

            {name && (
                <ErrorMessage name={name}>
                    {(errMsg) => {
                        return (
                               <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                        <span >
                            {errMsg.charAt(0).toUpperCase() + errMsg.slice(1).toLowerCase()}
                        </span>
                    </p>
                        )
                    }}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMHTMLEditor
