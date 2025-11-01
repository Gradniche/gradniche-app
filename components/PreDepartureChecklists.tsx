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

    useEffect(() => {
        localStorage.setItem('preDepartureChecklist', JSON.stringify(Array.from(checkedItems)));
    }, [checkedItems]);
    
    useEffect(() => {
        const orderToSave: Record<string, string[]> = {};
        checklist.forEach(category => {
            orderToSave[category.id] = category.items.map(item => item.id);
        });
        localStorage.setItem('preDepartureChecklistOrder', JSON.stringify(orderToSave));
    }, [checklist]);

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

    return (
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <style>{`
                .dragging {
                    border: 2px dashed #F6520C;
                    background: #2d201a;
                }
            `}</style>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Pre-Departure Checklist</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Stay organized and ensure a smooth transition abroad. Drag and drop tasks to create your personalized plan.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2 text-white">
                            <h2 className="text-xl font-semibold">Overall Progress</h2>
                            <span className="text-lg font-bold text-[#F6520C]">{completedItems} / {totalItems} Completed</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-orange-600 to-[#F6520C] h-4 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <span className="absolute inset-0 text-white font-bold text-xs flex items-center justify-center">{Math.round(progress)}%</span>
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-3">{getMotivationalMessage()}</p>
                    </div>

                    <div className="space-y-4">
                        {checklist.map(category => {
                             const isCategoryOpen = openCategoryId === category.id;
                             const categoryTotalItems = category.items.length;
                             const categoryCompletedItems = category.items.filter(item => checkedItems.has(item.id)).length;
                            return (
                                <div key={category.id} className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300">
                                    <button 
                                        onClick={() => setOpenCategoryId(isCategoryOpen ? null : category.id)}
                                        className="w-full flex justify-between items-center p-4 hover:bg-gray-800/70"
                                        aria-expanded={isCategoryOpen}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-[#F6520C] bg-gray-900/50 p-2 rounded-md">{category.icon}</div>
                                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm font-semibold text-gray-400">{categoryCompletedItems}/{categoryTotalItems}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out grid ${isCategoryOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                             <div className="p-4 border-t border-gray-700/50 space-y-3" onDragLeave={() => setDragOverItemId(null)}>
                                                {category.items.map(item => (
                                                    <div key={item.id}>
                                                        {dragOverItemId === item.id && <div className="h-1.5 bg-[#F6520C] rounded-full my-1 transition-all duration-200" />}
                                                        <label
                                                            htmlFor={item.id}
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, category.id, item.id)}
                                                            onDragEnter={(e) => handleDragEnter(e, category.id, item.id)}
                                                            onDrop={handleDrop}
                                                            onDragEnd={handleDragEnd}
                                                            onDragOver={handleDragOver}
                                                            className="flex items-center p-3 bg-gray-900/50 rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-900 transition-colors"
                                                        >
                                                            <div className="drag-handle text-gray-500 mr-3 touch-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                id={item.id}
                                                                checked={checkedItems.has(item.id)}
                                                                onChange={() => handleToggleCheck(item.id)}
                                                                className="sr-only peer"
                                                            />
                                                            <span className="w-6 h-6 rounded border-2 border-gray-600 flex-shrink-0 flex items-center justify-center peer-checked:bg-[#F6520C] peer-checked:border-[#F6520C] transition-colors">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white transition-opacity ${checkedItems.has(item.id) ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                            </span>
                                                            <span className={`ml-4 text-lg transition-colors ${checkedItems.has(item.id) ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
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
                    
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                        <button onClick={resetChecklist} className="text-gray-500 text-sm font-semibold hover:text-red-500 transition-colors">
                           Reset Checklist
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreDepartureChecklists;
