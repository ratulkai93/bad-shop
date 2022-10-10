import {Col, Row} from "react-bootstrap"
import { StoreItem } from "../components/storeitem"
import storeItems from "../data/items.json"

export function Store(){
    return (
        <>
            <h1> Store manager here! You come here often?</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item =>(
                    <Col key={item.id}>
                        {/* {JSON.stringify(item)} */}
                        <StoreItem {...item}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}