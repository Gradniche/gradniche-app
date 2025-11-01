import React, { useState, useEffect, useMemo } from 'react';
import { User, AvatarConfig, generateAvatarUrl } from '../data/forums';
import { maleAvatars, femaleAvatars } from '../data/avatars';

interface AvatarCustomizerProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
    onSave: (newConfig: AvatarConfig) => void;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ isOpen, onClose, currentUser, onSave }) => {
    const [selectedConfig, setSelectedConfig] = useState<AvatarConfig>(currentUser.avatarConfig);

    useEffect(() => {
        setSelectedConfig(currentUser.avatarConfig);
    }, [currentUser, isOpen]);

    const previewUrl = useMemo(() => generateAvatarUrl(selectedConfig), [selectedConfig]);

    const isSelected = (config: AvatarConfig) => {
        return config.options.seed === selectedConfig.options.seed;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-gray-900/80 backdrop-blur-lg border border-[#F6520C]/50 rounded-lg shadow-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Preview Panel */}
                <div className="md:w-1/3 flex flex-col items-center justify-center bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Your Avatar</h3>
                    <div className="w-48 h-48 bg-gray-700/50 rounded-full flex items-center justify-center ring-4 ring-[#F6520C]/50">
                        <img src={previewUrl} alt="Avatar Preview" className="w-40 h-40" />
                    </div>
                    <p className="text-sm text-gray-400 mt-4 text-center">Select an avatar from the list and save your choice.</p>
                </div>

                {/* Selection Panel */}
                <div className="md:w-2/3 flex flex-col">
                    <h2 className="text-2xl font-bold text-white mb-4">Choose Your Avatar</h2>
                    
                    <div className="flex-1 overflow-y-auto modern-scrollbar pr-2 space-y-6">
                        {/* Male Avatars */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-3">Male Avatars</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                {maleAvatars.map((avatarConfig, index) => (
                                    <button
                                        key={`male-${index}`}
                                        onClick={() => setSelectedConfig(avatarConfig)}
                                        className={`p-2 bg-gray-700/50 rounded-full transition-all duration-200 focus:outline-none ${isSelected(avatarConfig) ? 'ring-4 ring-[#F6520C]' : 'ring-2 ring-transparent hover:ring-gray-500'}`}
                                        aria-label={`Select Male Avatar ${index + 1}`}
                                    >
                                        <img src={generateAvatarUrl(avatarConfig)} alt={`Male Avatar ${index + 1}`} className="w-full h-full rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Female Avatars */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-3">Female Avatars</h4>
                             <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                {femaleAvatars.map((avatarConfig, index) => (
                                    <button
                                        key={`female-${index}`}
                                        onClick={() => setSelectedConfig(avatarConfig)}
                                        className={`p-2 bg-gray-700/50 rounded-full transition-all duration-200 focus:outline-none ${isSelected(avatarConfig) ? 'ring-4 ring-[#F6520C]' : 'ring-2 ring-transparent hover:ring-gray-500'}`}
                                        aria-label={`Select Female Avatar ${index + 1}`}
                                    >
                                        <img src={generateAvatarUrl(avatarConfig)} alt={`Female Avatar ${index + 1}`} className="w-full h-full rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end space-x-4">
                        <button onClick={onClose} className="px-6 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition">Cancel</button>
                        <button onClick={() => onSave(selectedConfig)} className="px-6 py-2 rounded-md bg-[#F6520C] text-white hover:bg-opacity-90 transition">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarCustomizer;