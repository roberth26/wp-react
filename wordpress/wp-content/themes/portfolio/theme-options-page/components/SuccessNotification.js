function SuccessNotification() {
    return (
        $( '<div />', {
            text: 'Theme Updated',
            css: {
                backgroundColor: '#1ca948',
                padding: '15px 30px',
                textAlign: 'center',
                position: 'fixed',
                bottom: 30,
                left: 0,
                right: 0,
                maxWidth: '50%',
                margin: '0 auto',
                color: 'white',
                borderRadius: 5,
                zIndex: 999999
            }
        })
    );
}