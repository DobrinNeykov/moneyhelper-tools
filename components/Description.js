import styles from "./MoneyInput.module.css";

export const Description = (props) => {
    const details = props.details;
    return (
        <>
        {details &&    
            <div className={styles.header}>
                This is graphql page 
                <h4 className={styles.title}>{details[0].title}</h4> 
                <div className={styles.description}>
                    {details[0].description && details[0].description.json && details[0].description.json[0].content && 
                        details[0].description.json[0].content.map((item, index) => {
                            let variants =[];
                            if(item.format) {
                                variants = item.format.variants;
                            }
                            
                            return  <p key={index} className={variants}>{item.value}</p>
                            
                        })
                    }
                </div>
            </div>
            
        }
        </>
    )
}