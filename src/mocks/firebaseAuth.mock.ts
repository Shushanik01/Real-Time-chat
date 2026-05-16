import { vi } from "vitest";

export const mockOnAuthStateChanged = vi.fn();
export const mockSignOut = vi.fn();

vi.mock('firebase/auth', ()=>{
    return{
        onAuthStateChanged: mockOnAuthStateChanged,
        signOut: mockSignOut
    }
})