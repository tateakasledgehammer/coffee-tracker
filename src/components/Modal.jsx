import ReactDom from 'react-dom'
// instead of returning JSX

export default function Modal(props) {
    const { children, handleCloseModal } = props
    
    // the button below is the background

    return ReactDom.createPortal (
        <div className="modal-container">
            <button onClick={handleCloseModal} className='modal-underlay' />
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}


// default set up for the modal vvv
//
//  export default function Modal() {
// 
//     return ReactDom.createPortal (
//        <div>
//
//        </div>,
//        document.getElementById('portal')
//    )
//  }