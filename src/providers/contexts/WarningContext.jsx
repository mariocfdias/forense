import React, { createContext, useState, useContext } from 'react'

export const WarningContext = createContext({})

export default function WarningProvider({ children }) {

    const [isActive, setActive] = useState(false);
    const [warningType, setWarningType] = useState('success');
    const [warningMessage, setWarningMessage] = useState('')
    const emitMessage = (type, message) => {

        let possibleTypes = [
            'error'
            , 'info'
            , 'success'
            , 'warning'
        ]

        if (possibleTypes.includes(type)) {
            setWarningType(type);
            setActive(true)
            setWarningMessage(message)
            setTimeout(() => {
                setActive(false)
            }, 6000)
        }
        else {
            console.log(`${type} message type does not exists`)
        }
    }

    return (
        <WarningContext.Provider value={{
            isActive,
            warningType,
            emitMessage,
            warningMessage
        }}>
            {children}

        </WarningContext.Provider>
    )
}

export function useWarningProvider() {

    const context = useContext(WarningContext);

    const {
        isActive,
        warningType,
        emitMessage,
        warningMessage
    } = context;

    return {
        isActive,
        warningType,
        emitMessage,
        warningMessage
    };
}