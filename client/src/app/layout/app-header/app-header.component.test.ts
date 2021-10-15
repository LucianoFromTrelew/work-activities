import * as app_header_component from "./app-header.component"
// @ponicode
describe("ngOnInit", () => {
    let inst: any

    beforeEach(() => {
        inst = new app_header_component.AppHeaderComponent()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.ngOnInit()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onClickLogout", () => {
    let inst: any

    beforeEach(() => {
        inst = new app_header_component.AppHeaderComponent()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.onClickLogout({ bubbles: true, cancelBubble: false, cancelable: true, composed: false, currentTarget: {}, defaultPrevented: true, eventPhase: Infinity, isTrusted: true, returnValue: false, srcElement: {}, target: null, timeStamp: Infinity, type: "", AT_TARGET: Infinity, BUBBLING_PHASE: Infinity, CAPTURING_PHASE: Infinity, NONE: Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})
