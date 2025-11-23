// definition de type de note de frais telque chaque note contient ces champs
export type note={
    id:number
    userId:number
    status:string
    category:string
    date_from:string
    date_to:string
    amount:number
    description:string
    currency:string
}

// type de props qu on passe en parametre a composante rejeterNoteFrais.jsx
export type rejeterProps={
    data:note[]             // liste de donnees
    setData:React.Dispatch<React.SetStateAction<note[]>> // fonction pour modifier les donner apres rejection de note si fait 
    id:number               // identifiant de note a rejeter
    setRejeternote:React.Dispatch<React.SetStateAction<props>> // cette fonction sert a afficher ou pas confirmation de rejection
}


export type props={
    id:number
    rejecter:boolean
}

export type approuverProps={
    data:note[]             
    setData:React.Dispatch<React.SetStateAction<note[]>>  
    id:number             
    setApprouvernote:React.Dispatch<React.SetStateAction<{id:number,approuver:boolean}>>
}

export type payerProps={
    data:note[]            
    setData:React.Dispatch<React.SetStateAction<note[]>>  
    id:number               
    setpayernote:React.Dispatch<React.SetStateAction<{id:number,payer:boolean}>> 
}