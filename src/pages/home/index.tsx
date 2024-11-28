import { memo, useState } from 'react';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import Canvas from './canvas';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);

  return (
    <div className='Home'>
      <div>
        <div>
          <div className='canvas'>
            <HomeContext.Provider value={[state, setState]}>
              <Canvas />
            </HomeContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
