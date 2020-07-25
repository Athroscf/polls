import React from 'react';
import Swal from 'sweetalert2';

import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const message = ( props ) => {
    let message = null;

    if (props.show) {
        message =
            Swal.fire({
                text: props.text,
                icon: props.icon,
                showCancelButton: props.cancelButton,
                cancelButtonText: props.cancelButtonText,
                cancelButtonColor: '#BA000D',
                confirmButtonText: props.confirmButtonText
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (props.confirmClicked) {
                        props.confirmClicked()
                    }
                }
            })
    }
    return (
        <Aux>
            {message}
        </Aux>
    )
}

export default message;
