import { Description } from '../components/Description';
import {GraphQLPageClient} from '../lib/GrahpQLPageClient';

export default function GraphQL({details}) {
    return (
        <Description details={details}/>
    )
}

export async function getServerSideProps() {
    const client = GraphQLPageClient.fromEnv();
    const res = await client.getAllToolInfo();
    const details = res?.data?.pacsDescriptionList?.items;
    return {
      props: {
        details,
      },
    };
  }