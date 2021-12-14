import type { App } from 'vue';
import {
    ElImage,
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElCollapse,
    ElCollapseItem,
    ElRow,
    ElCol,
    ElAlert
} from 'element-plus'

export function setupElement(app: App) {
    const elementComp = [ElImage, ElButton, ElForm, ElFormItem, ElInput, ElCollapse, ElCollapseItem, ElRow, ElCol, ElAlert]
    elementComp.forEach(v => {
        app.component(v.name, v)
    })
}