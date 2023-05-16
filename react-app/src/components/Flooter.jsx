import { Button } from 'antd';

const Flooter = ({ openLogin, openSignUp }) => {
    return (<div style={{ height: 72, width: '100%', backgroundColor: 'rgb(29, 155, 240)', boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px', position: 'fixed', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div>
        <div style={{ color: '#fff', fontSize: 27 }}>Don’t miss what’s happening</div>
        <div style={{
        fontSize: 15,
        color: '#fff',
      }}
        >People on Chitter are the first to know.</div>
      </div>
      <div style={{ marginLeft: 350, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button type="primary" onClick={openLogin} shape="round" style={{ backgroundColor: 'rgb(29, 155, 240)', color: '#fff', borderColor: '#fff' }} size={'large'}>
          Log in
        </Button>
        <Button type="primary" onClick={openSignUp} shape="round" style={{ backgroundColor: '#fff', color: '#000', marginLeft: 20 }} size={'large'}>
          Sign up
        </Button>
      </div>
    </div>);
};
export default Flooter;
