import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Car } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'

type Props = {
  items: Car[]
}

const WithServerSideProps = ({ items }: Props) => {
  const filtereditem = items.filter(obj => {
    const imageArr = [];
    const nonImageArr = [];
    obj.families.map(x => {
      if (x.baseVariantImages.length > 0) {
        imageArr.push(x);
      }
      else {
        nonImageArr.push(x)
      }
    });
    if (imageArr.length > 0) {
      const finalArr = imageArr.concat(nonImageArr);
      obj.families = finalArr;
      return true;
    }
    else {
      return false;
    }
  });
  console.log(filtereditem);  
  console.log(items);  
  
  return (

    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Cars list</h1>
      <div className='page-info'>
        <p>Cars Make list with Families that has at least 1 image in its families with image first family order</p>
      </div>
      <div className='car-cards-container'>
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Example for including serverSide props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: Car[] = sampleUserData
  return { props: { items } }
}

export default WithServerSideProps
