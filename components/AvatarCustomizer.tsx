import React, { useState, useEffect, useMemo } from 'react';
// FIX: Import the User interface from the data/forums module.
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in" onClick={onClose}>
            <div
                className="bg-[#050a14]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Preview Panel */}
                <div className="md:w-1/3 flex flex-col items-center justify-center bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6">Your Avatar</h3>
                    <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center ring-4 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        <img src={previewUrl} alt="Avatar Preview" className="w-40 h-40" />
                    </div>
                    <p className="text-sm text-gray-400 mt-6 text-center">Select an avatar from the list and save your choice.</p>
                </div>

                {/* Selection Panel */}
                <div className="md:w-2/3 flex flex-col h-full overflow-hidden">
                    <h2 className="text-2xl font-bold text-white mb-6">Choose Your Avatar</h2>
                    
                    <div className="flex-1 overflow-y-auto modern-scrollbar pr-4 space-y-8">
                        {/* Male Avatars */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-300 mb-4">Male Avatars</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {maleAvatars.map((avatarConfig, index) => (
                                    <button
                                        key={`male-${index}`}
                                        onClick={() => setSelectedConfig(avatarConfig)}
                                        className={`p-2 bg-white/5 rounded-full transition-all duration-300 focus:outline-none ${isSelected(avatarConfig) ? 'ring-4 ring-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'ring-2 ring-transparent hover:ring-white/20 hover:scale-105'}`}
                                        aria-label={`Select Male Avatar ${index + 1}`}
                                    >
                                        <img src={generateAvatarUrl(avatarConfig)} alt={`Male Avatar ${index + 1}`} className="w-full h-full rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Female Avatars */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-300 mb-4">Female Avatars</h4>
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {femaleAvatars.map((avatarConfig, index) => (
                                    <button
                                        key={`female-${index}`}
                                        onClick={() => setSelectedConfig(avatarConfig)}
                                        className={`p-2 bg-white/5 rounded-full transition-all duration-300 focus:outline-none ${isSelected(avatarConfig) ? 'ring-4 ring-purple-500 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'ring-2 ring-transparent hover:ring-white/20 hover:scale-105'}`}
                                        aria-label={`Select Female Avatar ${index + 1}`}
                                    >
                                        <img src={generateAvatarUrl(avatarConfig)} alt={`Female Avatar ${index + 1}`} className="w-full h-full rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-end space-x-4 shrink-0">
                        <button onClick={onClose} className="px-6 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-medium">Cancel</button>
                        <button onClick={() => onSave(selectedConfig)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity font-medium shadow-lg shadow-blue-500/25">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarCustomizer;