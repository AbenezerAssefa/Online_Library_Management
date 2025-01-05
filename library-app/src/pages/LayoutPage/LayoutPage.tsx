import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './LayoutPage.css'; // Adjust the path if necessary
import { RootState } from '../../redux/ReduxStore'; // Adjust the import path if necessary
import { LibraryCardModal, LoginRegisterModal } from '../../features/authentication'; // Adjust the import path if necessary
import { Footer, Navbar } from '../../features/navigation';
import { LoanBookModal } from '../../features/book';

export default function LayoutPage() {
  const state = useSelector((state: RootState) => state.modal); // Access the modal state correctly

  return (
    <div className="layout-page">
      {state.displayLogin && <LoginRegisterModal />} 
   {state.displayLibraryCard && <LibraryCardModal/>}
   {state.displayLoan && <LoanBookModal />}
      <Navbar />
      <Outlet /> 
      <Footer/>
    </div>
  );
}
