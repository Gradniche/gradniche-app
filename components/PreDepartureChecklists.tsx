
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { checklistData, ChecklistCategory } from '../data/checklists';

interface PreDepartureChecklistsProps {
    onBack: () => void;
}

const PreDepartureChecklists: React.FC<PreDepartureChecklistsProps> = ({ onBack }) => {
    const [checklist, setChecklist] = useState<ChecklistCategory[]>(() => {
        try {
            const savedOrderStr = localStorage.getItem('preDepartureChecklistOrder');
            if (!savedOrderStr) return checklistData;

            const savedOrder: Record<string, string[]> = JSON.parse(savedOrderStr);
            
            return checklistData.map(category => {
                const orderedIds = savedOrder[category.id];
                if (!orderedIds) return category;

                const newItems = [...category.items];
                newItems.sort((a, b) => {
                    const indexA = orderedIds.indexOf(a.id);
                    const indexB = orderedIds.indexOf(b.id);
                    if (indexA > -1 && indexB > -1) return indexA - indexB;
                    if (indexA > -1) return -1;
                    if (indexB > -1) return 1;
                    return 0;
                });

                return { ...category, items: newItems };
            });
        } catch (e) {
            console.error("Failed to load or parse checklist order from localStorage", e);
            return checklistData;
        }
    });

    const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem('preDepartureChecklist');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch (error) {
            console.error("Failed to parse checklist from localStorage", error);
            return new Set();
        }
    });
    
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(checklistData[0]?.id || null);
    const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
    const dragItemRef = useRef<{ categoryId: string; itemId: string } | null>(null);

    const handleSaveProgress = () => {
        try {
            localStorage.setItem('preDepartureChecklist', JSON.stringify(Array.from(checkedItems)));
            
            const orderToSave: Record<string, string[]> = {};
            checklist.forEach(category => {
                orderToSave[category.id] = category.items.map(item => item.id);
            });
            localStorage.setItem('preDepartureChecklistOrder', JSON.stringify(orderToSave));
            alert('Checklist progress saved!');
        } catch (e) {
            console.error("Failed to save checklist to localStorage", e);
            alert('Error saving your progress.');
        }
    };

    const handleToggleCheck = (itemId: string) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };
    
    const resetChecklist = () => {
        if (window.confirm("Are you sure you want to reset your checklist? All progress will be lost.")) {
            setCheckedItems(new Set());
            setChecklist(checklistData); // Also reset order
        }
    };

    const totalItems = useMemo(() => checklist.reduce((acc, category) => acc + category.items.length, 0), [checklist]);
    const completedItems = checkedItems.size;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    const getMotivationalMessage = () => {
        if (progress === 0) return "Let's get started on your journey!";
        if (progress < 30) return "You're making great progress!";
        if (progress < 70) return "You're well on your way!";
        if (progress < 100) return "Almost there, keep it up!";
        if (progress === 100) return "Congratulations! You're all set to go! ✈️";
        return "";
    };
    
    // --- Drag and Drop Handlers ---
    const handleDragStart = (e: React.DragEvent<HTMLLabelElement>, categoryId: string, itemId: string) => {
        dragItemRef.current = { categoryId, itemId };
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            (e.target as HTMLLabelElement).classList.add('opacity-50', 'dragging');
        }, 0);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>, categoryId: string, itemId: string) => {
        if (dragItemRef.current && dragItemRef.current.categoryId === categoryId && dragItemRef.current.itemId !== itemId) {
            setDragOverItemId(itemId);
        }
    };

    const handleDrop = () => {
        if (!dragItemRef.current || !dragOverItemId) return;

        const { categoryId: dragCategoryId, itemId: dragItemId } = dragItemRef.current;
        const dropItemId = dragOverItemId;

        if (dragItemId === dropItemId) return;

        setChecklist(prevChecklist => {
            const newChecklist = JSON.parse(JSON.stringify(prevChecklist)); // Deep copy
            const categoryIndex = newChecklist.findIndex((c: ChecklistCategory) => c.id === dragCategoryId);
            if (categoryIndex === -1) return prevChecklist;

            const category = newChecklist[categoryIndex];
            const items = category.items;
            const dragItemIndex = items.findIndex((item: any) => item.id === dragItemId);
            const dropItemIndex = items.findIndex((item: any) => item.id === dropItemId);
            
            if (dragItemIndex === -1 || dropItemIndex === -1) return prevChecklist;

            const [draggedItem] = items.splice(dragItemIndex, 1);
            items.splice(dropItemIndex, 0, draggedItem);
            
            return newChecklist;
        });
    };
    
    const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
        dragItemRef.current = null;
        setDragOverItemId(null);
        (e.target as HTMLLabelElement).classList.remove('opacity-50', 'dragging');
        document.querySelectorAll('.dragging').forEach(el => el.classList.remove('opacity-50', 'dragging'));
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    const gradients = [
        'from-orange-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-emerald-500 to-teal-500',
        'from-purple-500 to-indigo-500',
        'from-rose-500 to-red-500',
        'from-amber-500 to-orange-500',
        'from-cyan-500 to-blue-500',
    ];

    return (
        <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
            <style>{`
                .dragging {
                    border: 2px dashed #F6520C;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(8px);
                }
            `}</style>
            
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="mb-12">
                    <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="font-medium">Back to Tools</span>
                    </button>
                </div>

                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Preparation</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Pre-Departure Checklist</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light">
                        Stay organized and ensure a smooth transition abroad. Drag and drop tasks to create your personalized plan.
                    </p>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-4 text-white">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Overall Progress</h2>
                                <p className="text-sm text-gray-400 font-light mt-1">{getMotivationalMessage()}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-[#F6520C]">{Math.round(progress)}%</span>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{completedItems} of {totalItems} tasks</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-3 relative overflow-hidden border border-white/10">
                            <div
                                className="bg-gradient-to-r from-orange-500 to-pink-600 h-full rounded-full transition-all duration-1000 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30"></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {checklist.map((category, index) => {
                             const isCategoryOpen = openCategoryId === category.id;
                             const categoryTotalItems = category.items.length;
                             const categoryCompletedItems = category.items.filter(item => checkedItems.has(item.id)).length;
                             const isCategoryComplete = categoryTotalItems > 0 && categoryCompletedItems === categoryTotalItems;
                             
                            return (
                                <div key={category.id} className={`bg-black/20 rounded-2xl border transition-all duration-500 overflow-hidden ${isCategoryOpen ? 'border-white/20 shadow-lg shadow-white/5' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}`}>
                                    <button 
                                        onClick={() => setOpenCategoryId(isCategoryOpen ? null : category.id)}
                                        className="w-full flex justify-between items-center p-6 focus:outline-none group"
                                        aria-expanded={isCategoryOpen}
                                    >
                                        <div className="flex items-center space-x-5">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ${isCategoryComplete ? 'opacity-50 grayscale' : ''}`}>
                                                {React.cloneElement(category.icon, { className: "h-6 w-6 text-white" })}
                                            </div>
                                            <div className="text-left">
                                                <h3 className={`text-xl font-bold tracking-tight transition-colors ${isCategoryComplete ? 'text-gray-500 line-through' : 'text-white group-hover:text-[#F6520C]'}`}>{category.title}</h3>
                                                <p className="text-sm text-gray-400 font-light mt-0.5">{categoryCompletedItems} of {categoryTotalItems} completed</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {isCategoryComplete && (
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                </span>
                                            )}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transition-transform duration-500 ${isCategoryOpen ? 'rotate-180 text-[#F6520C]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out grid ${isCategoryOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                             <div className="p-6 pt-0 border-t border-white/5 space-y-3 mt-2" onDragLeave={() => setDragOverItemId(null)}>
                                                {category.items.map(item => (
                                                    <div key={item.id} className="relative">
                                                        {dragOverItemId === item.id && <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full z-10" />}
                                                        <label
                                                            htmlFor={item.id}
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, category.id, item.id)}
                                                            onDragEnter={(e) => handleDragEnter(e, category.id, item.id)}
                                                            onDrop={handleDrop}
                                                            onDragEnd={handleDragEnd}
                                                            onDragOver={handleDragOver}
                                                            className={`flex items-center p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-300 border ${checkedItems.has(item.id) ? 'bg-white/[0.02] border-white/5' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                                                        >
                                                            <div className="drag-handle text-gray-600 hover:text-gray-400 mr-4 touch-none transition-colors">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                                                </svg>
                                                            </div>
                                                            <div className="relative flex items-center justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    id={item.id}
                                                                    checked={checkedItems.has(item.id)}
                                                                    onChange={() => handleToggleCheck(item.id)}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-6 h-6 rounded border-2 border-gray-500 flex-shrink-0 flex items-center justify-center peer-checked:bg-gradient-to-br peer-checked:from-orange-500 peer-checked:to-pink-600 peer-checked:border-transparent transition-all duration-300 shadow-inner">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white transition-all duration-300 ${checkedItems.has(item.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                                </div>
                                                            </div>
                                                            <span className={`ml-4 text-lg transition-all duration-300 ${checkedItems.has(item.id) ? 'text-gray-500 line-through font-light' : 'text-gray-200 font-medium'}`}>
                                                                {item.label}
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <button onClick={resetChecklist} className="text-gray-400 text-sm font-medium hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/10 w-full sm:w-auto">
                           Reset Checklist
                        </button>
                        <button onClick={handleSaveProgress} className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 1v10h6V5H7z" />
                                <path d="M9 1a1 1 0 00-1 1v2a1 1 0 002 0V2a1 1 0 00-1-1z" />
                            </svg>
                            <span>Save Progress</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreDepartureChecklists;
