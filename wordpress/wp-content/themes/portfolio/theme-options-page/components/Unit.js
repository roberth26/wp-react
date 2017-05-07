function Unit( unit, dark, appStore ) {
    return (
        $( '<div />', {
            css: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: dark ? 'rgba( 0, 0, 0, .05 )' : ''
            },
            html: [
                $( '<div />', {
                    text: unit.name,
                    css: {
                        flexBasis: '75%'
                    }
                }),
                $( '<input />', {
                    css: {
                        height: 30,
                        flex: 1,
                        marginRight: 15,
                        maxWidth: '25%'
                    },
                    value: unit.value,
                    type: 'number',
                    change: function( e ) {
                        appStore.setUnitValue( unit, e.target.value );
                    }
                }),
                $( '<div>px</div>' )
            ]
        })
    );
}