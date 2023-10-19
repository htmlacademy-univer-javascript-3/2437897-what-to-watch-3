import {Link} from 'react-router-dom';

export function NotFoundPage(){
  return (
    <div style={{paddingLeft: 20}}>
      <h1>404 Not Found</h1>
      <p>
        Go to main <Link to='/'>page</Link>
      </p>
    </div>
  );
}

