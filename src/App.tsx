import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import * as XLSX from 'xlsx';
import {motion, AnimatePresence} from 'motion/react';
import {
  Upload,
  FileSpreadsheet,
  Trash2,
  Wand2,
  Download,
  Copy,
  GraduationCap,
  CheckCircle,
  X,
  Book,
  Users,
  Calendar,
  PlusCircle,
  Plus,
  HelpCircle,
  FileCheck,
  RefreshCw,
  RotateCcw,
  Save,
  Key,
  ChevronDown,
  User,
  Hash,
  Award,
  MessageSquare,
  Search,
  Star,
  Sparkles,
  Settings,
  BookOpen,
  Edit3,
  Heart,
  Star as StarIcon
} from 'lucide-react';
import {cn} from '@/src/lib/utils';
import {
  ALL_SUBJECTS_BANK,
  competenciesGood,
  competenciesFair,
  competenciesPoor,
  qualitiesGood,
  qualitiesFair,
  qualitiesPoor,
  FOUNDATIONAL_SAMPLES
} from './constants';
import { generateAICommentsBatch, type GenerateCommentParams, type AIConfig } from './services/geminiService';

interface StudentData {
  _rowIndex: number;
  [key: string]: any;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
  label?: string;
  variant?: 'default' | 'blue' | 'orange' | 'green';
  samples?: Record<string, any>;
}

function CustomSelect({ value, onChange, options, placeholder = "-- Chọn --", icon, label, variant = 'default', samples }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'blue': return "border-blue-100 hover:border-blue-300 text-blue-700 bg-blue-50/30";
      case 'orange': return "border-orange-100 hover:border-orange-300 text-orange-700 bg-orange-50/30";
      case 'green': return "border-green-100 hover:border-green-300 text-green-700 bg-green-50/30";
      default: return "border-gray-100 hover:border-blue-200 text-gray-700 bg-white";
    }
  };

  const getLabelColor = () => {
    switch (variant) {
      case 'blue': return "text-blue-500";
      case 'orange': return "text-orange-500";
      case 'green': return "text-green-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={containerRef}>
      {label && <span className={cn("text-[9px] font-bold uppercase tracking-wider", getLabelColor())}>{label}</span>}
      <button
        type="button"
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) setSearchTerm(""); }}
        className={cn(
          "w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2 text-[11px] font-medium transition-all outline-none text-left shadow-sm",
          isOpen ? "border-blue-500 ring-4 ring-blue-50 bg-white" : getVariantStyles(),
          !value && "text-gray-400"
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-grow">
          {icon && <span className={cn("flex-shrink-0", getLabelColor())}>{icon}</span>}
          <div className="flex flex-col min-w-0">
            <span className="truncate">{value || placeholder}</span>
            {value && samples && samples[value] && (
              <span className="text-[8px] text-gray-400 truncate opacity-80 leading-none mt-0.5">
                VD: {String(samples[value])}
              </span>
            )}
          </div>
        </div>
        <ChevronDown size={12} className={cn("text-gray-400 transition-transform flex-shrink-0 ml-auto", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col max-h-[300px] ring-1 ring-black/5"
          >
            <div className="p-2 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
              <Search size={12} className="text-gray-400" />
              <input 
                autoFocus
                type="text"
                placeholder="Tìm cột..."
                className="bg-transparent border-none outline-none text-[10px] w-full py-1"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto py-1 table-container">
              <button
                onClick={() => { onChange(""); setIsOpen(false); }}
                className="w-full text-left px-4 py-2 text-[10px] hover:bg-gray-50 text-gray-400 italic"
              >
                -- {placeholder} --
              </button>
              {filteredOptions.length === 0 && (
                <div className="px-4 py-4 text-[10px] text-gray-400 text-center flex flex-col items-center gap-2">
                  <Search size={24} className="opacity-20" />
                  Không tìm thấy cột "{searchTerm}"
                </div>
              )}
              {filteredOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-[11px] transition-colors flex items-center justify-between group border-b border-gray-50 last:border-0",
                    value === opt ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-blue-50/50"
                  )}
                >
                  <div className="flex flex-col min-w-0 pr-4">
                    <span className="truncate">{opt}</span>
                    {samples && samples[opt] && (
                      <span className="text-[9px] text-gray-400 font-normal truncate">
                         {String(samples[opt])}
                      </span>
                    )}
                  </div>
                  {value === opt && <FileCheck size={12} className="text-blue-500 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility for accent-insensitive search
const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
};

export default function App() {
  const [rawDataAOA, setRawDataAOA] = useState<any[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [sampleRow, setSampleRow] = useState<Record<string, any>>({});
  const [headerRowIndex, setHeaderRowIndex] = useState(-1);
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheetName, setSheetName] = useState("");
  const [availableSheets, setAvailableSheets] = useState<string[]>([]);
  const [showSheetSelector, setShowSheetSelector] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");
  const [isProcessed, setIsProcessed] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState<Set<"GK1" | "CK1" | "GK2" | "CK2" | "CN">>(new Set(["CK1"]));
  const [filterEmptyComments, setFilterEmptyComments] = useState(false);
  const [showConfirm, setShowConfirm] = useState<{type: 'all' | 'comments', action: () => void} | null>(null);

  // Config State
  const [subject, setSubject] = useState("Toán");
  const [gradeLevel, setGradeLevel] = useState("general");
  const [colMapping, setColMapping] = useState({
    name: "",
    studentId: "",
    periods: {
      GK1: { score: "", level: "", comment: "" },
      CK1: { score: "", level: "" , comment: "" },
      GK2: { score: "", level: "" , comment: "" },
      CK2: { score: "", level: "" , comment: "" },
      CN: { score: "", level: "", comment: "" },
    }
  });
  const [autoLevel, setAutoLevel] = useState(true);
  const [useAI, setUseAI] = useState(false);
  const [overwriteExisting, setOverwriteExisting] = useState(true);
  const [aiConfig, setAIConfig] = useState<AIConfig>({
    tone: "encouraging",
    length: "medium",
    avoidKeywords: [],
    foundationalComments: [],
    includeName: true
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isRegeneratingSingle, setIsRegeneratingSingle] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);
  const [avoidKeywordsInput, setAvoidKeywordsInput] = useState("");
  const [managingLibrary, setManagingLibrary] = useState(false);
  const [editingPersonalId, setEditingPersonalId] = useState<string | null>(null);
  const [personalComments, setPersonalComments] = useState<{id: string, text: string, category: string}[]>([]);
  const [personalSearch, setPersonalSearch] = useState("");
  const [personalCategoryFilter, setPersonalCategoryFilter] = useState("Tất cả");
  const [newPersonalText, setNewPersonalText] = useState("");
  const [newPersonalCategory, setNewPersonalCategory] = useState("Chung");
  const [bankPeriodType, setBankPeriodType] = useState<"regular" | "yearEnd">("regular");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [showingHelp, setShowingHelp] = useState(false);
  const [showingSettings, setShowingSettings] = useState(false);
  const [foundationSearch, setFoundationSearch] = useState("");

  // Bank State (Editable)
  const [bankCompetencies, setBankCompetencies] = useState({
    good: competenciesGood,
    fair: competenciesFair,
    poor: competenciesPoor
  });
  const [bankQualities, setBankQualities] = useState({
    good: qualitiesGood,
    fair: qualitiesFair,
    poor: qualitiesPoor
  });
  const [bankSubjects, setBankSubjects] = useState(ALL_SUBJECTS_BANK);

  const availableFoundationalComments = useMemo(() => {
    const list: { text: string; category: string; type: 'personal' | 'system' | 'sample' }[] = [];
    
    personalComments.forEach(c => list.push({ ...c, type: 'personal' }));
    FOUNDATIONAL_SAMPLES.forEach(s => list.push({ text: s.text, category: `Mẫu: ${s.category}`, type: 'sample' }));
    
    if (bankSubjects[subject]) {
      const subData = bankSubjects[subject];
      const gradesToInclude = [gradeLevel];
      if (gradeLevel !== 'general') gradesToInclude.push('general');
      
      gradesToInclude.forEach(g => {
        if (subData[g]) {
          Object.entries(subData[g]).forEach(([lvl, val]) => {
            if (lvl === 'yearEnd' && val && typeof val === 'object' && !Array.isArray(val)) {
              Object.entries(val).forEach(([subLvl, texts]) => {
                if (Array.isArray(texts)) {
                  texts.forEach(t => list.push({
                    text: t,
                    category: `${subject}${g === 'general' ? ' (Chung)' : ''} - Cuối năm: ${subLvl}`,
                    type: 'system'
                  }));
                }
              });
            } else if (Array.isArray(val)) {
              val.forEach(t => list.push({ 
                text: t, 
                category: `${subject}${g === 'general' ? ' (Chung)' : ''} - ${lvl}`, 
                type: 'system' 
              }));
            }
          });
        }
      });
    }

    if (!foundationSearch) return list;
    const searchLower = removeAccents(foundationSearch.toLowerCase());
    return list.filter(c => 
      removeAccents(c.text.toLowerCase()).includes(searchLower) || 
      removeAccents(c.category.toLowerCase()).includes(searchLower)
    );
  }, [personalComments, bankSubjects, subject, gradeLevel, foundationSearch]);

  // UI State
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [editingStudent, setEditingStudent] = useState<{idx: number, period: "GK1" | "CK1" | "GK2" | "CK2" | "CN"} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 3000);
  };

  const hasApiKey = useMemo(() => !!process.env.GEMINI_API_KEY, []);

  useEffect(() => {
    if (useAI && !hasApiKey) {
      showToast("Chưa cấu hình GEMINI_API_KEY! Vui lòng thiết lập trong Cài đặt.", "error");
    }
  }, [useAI, hasApiKey]);

  useEffect(() => {
    const savedPersonalId = localStorage.getItem('report_helper_personal_comments_v2_id');
    if (savedPersonalId) {
      try {
        const loaded = JSON.parse(savedPersonalId);
        
        // Migration for specific phrases to be more natural (Circular 27)
        const migrationFlag = localStorage.getItem('report_helper_phrase_migration_v27');
        if (!migrationFlag) {
          const phraseMap = [
            { target: "Hoàn thành các yêu cầu", replacement: "Đáp ứng tốt các yêu cầu của bài học" },
            { target: "Hoàn thành các bài tập", replacement: "Nắm vững kiến thức và tích cực thực hành bài tập" },
            { target: "Hoàn thành nội dung học tập", replacement: "Chủ động củng cố tri thức và rèn luyện kỹ năng" },
            { target: "Hoàn thành các nhiệm vụ", replacement: "Nỗ lực và đạt kết quả tốt trong các hoạt động học tập" }
          ];

          let changed = false;
          const migrated = loaded.map((c: any) => {
            let newText = c.text;
            phraseMap.forEach(p => {
              if (newText.includes(p.target)) {
                changed = true;
                newText = newText.replace(new RegExp(p.target, 'g'), p.replacement);
              }
            });
            return changed ? { ...c, text: newText } : c;
          });

          if (changed) {
            setPersonalComments(migrated);
            localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(migrated));
          } else {
            setPersonalComments(loaded);
          }
          localStorage.setItem('report_helper_phrase_migration_v27', 'true');
        } else {
          setPersonalComments(loaded);
        }
      } catch (e) {
        console.error("Error loading personal comments with IDs", e);
      }
    } else {
      // Migrate from old format (v2 no id)
      const v2Saved = localStorage.getItem('report_helper_personal_comments_v2');
      if (v2Saved) {
        try {
          const oldList: {text: string, category: string}[] = JSON.parse(v2Saved);
          const migrated = oldList.map((c, i) => ({ 
            id: `pc_migrated_${Date.now()}_${i}`, 
            text: c.text, 
            category: c.category || "Chung" 
          }));
          setPersonalComments(migrated);
          localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(migrated));
        } catch(e) {}
      } else {
        // Migrate from even older format
        const oldSaved = localStorage.getItem('report_helper_personal_comments');
        if (oldSaved) {
          try {
            const oldList: string[] = JSON.parse(oldSaved);
            const migrated = oldList.map((t, i) => ({ 
              id: `pc_migrated_old_${Date.now()}_${i}`, 
              text: t, 
              category: "Chung" 
            }));
            setPersonalComments(migrated);
            localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(migrated));
          } catch(e) {}
        }
      }
    }

    const saved = localStorage.getItem('report_helper_default_config');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.subject) setSubject(config.subject);
        if (config.gradeLevel) setGradeLevel(config.gradeLevel);
      } catch (e) {
        console.error("Error loading initial config", e);
      }
    }

    const savedBank = localStorage.getItem('report_helper_comment_bank');
    if (savedBank) {
      try {
        const { competencies, qualities, subjects } = JSON.parse(savedBank);
        if (competencies) setBankCompetencies(competencies);
        if (qualities) setBankQualities(qualities);
        // Merge with current ALL_SUBJECTS_BANK to ensure new subjects like 'Hướng nghiệp' are added
        if (subjects) {
          setBankSubjects({...ALL_SUBJECTS_BANK, ...subjects});
        }
      } catch (e) {
        console.error("Error loading bank", e);
      }
    }
  }, []);

  const saveBankToLocal = (comp: any, qual: any, subj: any) => {
    localStorage.setItem('report_helper_comment_bank', JSON.stringify({
      competencies: comp,
      qualities: qual,
      subjects: subj
    }));
  };

  useEffect(() => {
    if (studentsData.length > 0 && isProcessed) {
      localStorage.setItem('report_helper_current_draft', JSON.stringify({
        fileName: originalFileName,
        subject,
        gradeLevel,
        data: studentsData,
        processed: isProcessed,
        colMapping,
        selectedPeriods: Array.from(selectedPeriods)
      }));
    }
  }, [studentsData, isProcessed, originalFileName, subject, gradeLevel, colMapping, selectedPeriods]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('report_helper_current_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Only prompt if no file is currently uploaded
        if (studentsData.length === 0) {
          if (confirm(`Bạn có bản thảo đang dở của file "${draft.fileName}". Bạn có muốn khôi phục không?`)) {
            setOriginalFileName(draft.fileName);
            setSubject(draft.subject);
            setGradeLevel(draft.gradeLevel);
            setStudentsData(draft.data);
            setIsProcessed(draft.processed);
            setColMapping(draft.colMapping);
            setSelectedPeriods(new Set(draft.selectedPeriods));
            showToast("Đã khôi phục bản thảo!");
          } else {
            localStorage.removeItem('report_helper_current_draft');
          }
        }
      } catch (e) {
        console.error("Error restoring draft", e);
      }
    }
  }, []); // Only on mount

  const savePersonalComment = (comment: string, category: string = "Chung") => {
    const clean = comment.trim();
    if (!clean) return;
    
    // Prevent duplicates in the same category
    if (personalComments.some(c => c.text === clean && c.category === category)) {
      showToast("Nhận xét này đã có trong nhóm " + category, "error");
      return;
    }
    
    const newComment = { 
      id: `pc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, 
      text: clean, 
      category 
    };
    const newList = [newComment, ...personalComments];
    setPersonalComments(newList);
    localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(newList));
    showToast(`Đã lưu vào mục ${category}!`);
  };

  const updatePersonalComment = (id: string, text: string, category: string) => {
    const originalComment = personalComments.find(c => c.id === id);
    const newList = personalComments.map(c => 
      c.id === id ? { ...c, text, category } : c
    );
    setPersonalComments(newList);
    localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(newList));

    // Update foundational comments if this one was selected
    if (originalComment && aiConfig.foundationalComments?.includes(originalComment.text)) {
      setAIConfig(prev => ({
        ...prev,
        foundationalComments: (prev.foundationalComments || []).map(t => 
          t === originalComment.text ? text : t
        )
      }));
    }
  };

  const deletePersonalComment = (id: string) => {
    const originalComment = personalComments.find(c => c.id === id);
    const newList = personalComments.filter(c => c.id !== id);
    setPersonalComments(newList);
    localStorage.setItem('report_helper_personal_comments_v2_id', JSON.stringify(newList));
    
    // Remove from foundational comments if selected
    if (originalComment && aiConfig.foundationalComments?.includes(originalComment.text)) {
      setAIConfig(prev => ({
        ...prev,
        foundationalComments: (prev.foundationalComments || []).filter(t => t !== originalComment.text)
      }));
    }
    
    showToast("Đã xóa khỏi thư viện cá nhân");
  };

  const personalCategories = useMemo(() => ["Tất cả", ...new Set(personalComments.map(c => c.category))], [personalComments]);
  
  const filteredPersonal = useMemo(() => {
    const searchLower = removeAccents(personalSearch.toLowerCase());
    return personalComments.filter(c => {
      const matchesCategory = personalCategoryFilter === "Tất cả" || c.category === personalCategoryFilter;
      const textNoAccent = removeAccents(c.text.toLowerCase());
      const catNoAccent = removeAccents(c.category.toLowerCase());
      const matchesSearch = textNoAccent.includes(searchLower) || catNoAccent.includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [personalComments, personalSearch, personalCategoryFilter]);

  const handleFiles = (file: File) => {
    if (!file) return;
    
    // Check file type
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
      showToast("Định dạng file không hỗ trợ! Vui lòng chọn file .xlsx, .xls hoặc .csv", "error");
      return;
    }

    setOriginalFileName(file.name);
    setIsProcessingFile(true);
    setProcessingProgress(10);
    setFileError(null);

    const reader = new FileReader();
    
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 40) + 10;
        setProcessingProgress(progress);
      }
    };

    reader.onload = (e) => {
      setProcessingProgress(50);
      setTimeout(() => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const wb = XLSX.read(data, {type: 'array', cellStyles: true});
          setWorkbook(wb);
          setProcessingProgress(70);
          
          if (wb.SheetNames.length === 0) {
            throw new Error("File Excel không có sheet nào!");
          }

          if (wb.SheetNames.length > 1) {
            setAvailableSheets(wb.SheetNames);
            setShowSheetSelector(true);
            setIsProcessingFile(false);
          } else {
            processSheet(wb, wb.SheetNames[0]);
          }
        } catch (err: any) {
          console.error(err);
          const msg = err.message || "Lỗi đọc file Excel!";
          setFileError(msg);
          showToast(msg, "error");
          setIsProcessingFile(false);
          setOriginalFileName("");
        }
      }, 100);
    };

    reader.onerror = () => {
      setFileError("Lỗi đọc file từ đĩa!");
      showToast("Lỗi đọc file từ đĩa!", "error");
      setIsProcessingFile(false);
      setOriginalFileName("");
    };

    reader.readAsArrayBuffer(file);
  };

  const processSheet = (wb: XLSX.WorkBook, sn: string) => {
    setIsProcessingFile(true);
    setProcessingProgress(75);
    setFileError(null);

    setTimeout(() => {
      try {
        const ws = wb.Sheets[sn];
        if (!ws) {
          throw new Error(`Không tìm thấy sheet "${sn}"!`);
        }
        
        const aoa = XLSX.utils.sheet_to_json(ws, {header: 1, defval: ""}) as any[][];
        if (aoa.length === 0) {
          throw new Error("Sheet này không có dữ liệu!");
        }

        setProcessingProgress(85);
        setSheetName(sn);
        setRawDataAOA(aoa);

        // Find Headers
        let hIdx = -1;
        for (let i = 0; i < Math.min(25, aoa.length); i++) {
          const row = aoa[i];
          if (row.some(cell => {
            if (typeof cell !== 'string') return false;
            const c = cell.toLowerCase();
            return c.includes('tên') || c.includes('họ và') || c.includes('stt') || c.includes('mã hs');
          })) {
            hIdx = i;
            break;
          }
        }
        
        if (hIdx === -1) {
          // If no obvious headers found, use first row that has content
          for (let i = 0; i < aoa.length; i++) {
            if (aoa[i].some(c => c !== "")) {
              hIdx = i;
              break;
            }
          }
        }

        if (hIdx === -1) {
          throw new Error("Không thể xác định hàng tiêu đề của bảng!");
        }

        setHeaderRowIndex(hIdx);
        const h = aoa[hIdx].map((val, i) => val ? String(val).trim() : `Cột_${i}`);
        
        if (h.length === 0) {
          throw new Error("Hàng tiêu đề không có nội dung!");
        }
        
        setHeaders(h);
        setProcessingProgress(90);

        // Get sample data
        let sample: Record<string, any> = {};
        let foundSample = false;
        for (let i = hIdx + 1; i < aoa.length; i++) {
          if (aoa[i].some((c: any) => c !== "")) {
            h.forEach((col, idx) => {
              sample[col] = aoa[i][idx] || "";
            });
            foundSample = true;
            break;
          }
        }
        setSampleRow(sample);

      // Auto detect config...
      const cleanName = removeAccents(originalFileName || sn).toLowerCase();
      
      // 1. Subject Detection
      let detectedSubject = "Toán";
      const subjectKeywords: Record<string, string[]> = {
        "Toán": ["toan", "math"],
        "Tiếng Việt": ["tieng viet", " tv ", "mon tv"],
        "Tin học": ["tin hoc", " tin ", "it"],
        "Tiếng Anh": ["tieng anh", " anh ", "english", " t.anh"],
        "Đạo đức": ["dao duc", " dd "],
        "Tự nhiên và Xã hội": ["tu nhien", "tnxh", "tn&xh"],
        "Khoa học": ["khoa hoc", " kh "],
        "Lịch sử và Địa lí": ["lich su", "dia li", "lsdl", "ls&dl", "ls dl"],
        "Công nghệ": ["cong nghe", " cn "],
        "Hoạt động trải nghiệm": ["hoat dong", "hdtn", "trai nghiem"],
        "Âm nhạc": ["am nhac", " an "],
        "Mĩ thuật": ["mi thuat", " mt "],
        "Giáo dục thể chất": ["the chat", "gdtc", "the duc"],
      };

      const detectFromStr = (str: string) => {
        for (const [sub, keywords] of Object.entries(subjectKeywords)) {
          if (keywords.some(k => str.includes(k))) return sub;
        }
        return null;
      };

      const fromName = detectFromStr(cleanName);
      if (fromName) {
        detectedSubject = fromName;
      } else {
        for (let i = 0; i < Math.min(15, aoa.length); i++) {
          const rowStr = removeAccents(aoa[i].join(' ').toLowerCase());
          const fromContent = detectFromStr(rowStr);
          if (fromContent) {
            detectedSubject = fromContent;
            break;
          }
        }
      }
      setSubject(detectedSubject);

      // 2. Grade Detection
      let detectedGrade = "general";
      const gradeMatch = cleanName.match(/(lop|khoi|k)\s*([12345])/);
      if (gradeMatch) {
        detectedGrade = gradeMatch[2];
      } else {
        for (let i = 0; i < Math.min(10, aoa.length); i++) {
          const rowStr = removeAccents(aoa[i].join(' ').toLowerCase());
          const m = rowStr.match(/(lop|khoi)\s*([12345])/);
          if (m) {
            detectedGrade = m[2];
            break;
          }
        }
      }
      const mapping = detectMappings(h);
      
      const savedStr = localStorage.getItem('report_helper_default_config');
      if (savedStr) {
        try {
          const saved = JSON.parse(savedStr);
          const hSet = new Set(h);
          if (saved.colMapping) {
            const sm = saved.colMapping;
            if (sm.name && hSet.has(sm.name)) mapping.name = sm.name;
            if (sm.studentId && hSet.has(sm.studentId)) mapping.studentId = sm.studentId;
            (["GK1", "CK1", "GK2", "CK2"] as const).forEach(p => {
              if (sm.periods[p].score && hSet.has(sm.periods[p].score)) mapping.periods[p].score = sm.periods[p].score;
              if (sm.periods[p].level && hSet.has(sm.periods[p].level)) mapping.periods[p].level = sm.periods[p].level;
              if (sm.periods[p].comment && hSet.has(sm.periods[p].comment)) mapping.periods[p].comment = sm.periods[p].comment;
            });
          }
          if (detectedSubject === "Toán" && saved.subject) detectedSubject = saved.subject;
          if (detectedGrade === "general" && saved.gradeLevel) detectedGrade = saved.gradeLevel;
        } catch (e) {}
      }

      setGradeLevel(detectedGrade);
      setSubject(detectedSubject);
      setColMapping(mapping);

      // 3. Period Detection
      const hStr = h.join(' ').toLowerCase();
      const activePeriods = new Set<"GK1" | "CK1" | "GK2" | "CK2">();
      if (cleanName.includes('gk1') || hStr.includes('gk1')) activePeriods.add("GK1");
      if (cleanName.includes('ck1') || cleanName.includes('hoc ky 1') || hStr.includes('ck1')) activePeriods.add("CK1");
      if (cleanName.includes('gk2') || hStr.includes('gk2')) activePeriods.add("GK2");
      if (cleanName.includes('ck2') || cleanName.includes('hoc ky 2') || hStr.includes('ck2')) activePeriods.add("CK2");
      if (activePeriods.size === 0) activePeriods.add("CK2");
      setSelectedPeriods(activePeriods);

      const students: StudentData[] = [];
      for (let i = hIdx + 1; i < aoa.length; i++) {
        const row = aoa[i];
        if (row.some(cell => cell !== "")) {
          let s: StudentData = {_rowIndex: i};
          h.forEach((col, colIndex) => { s[col] = row[colIndex] ?? ""; });
          students.push(s);
        }
      }
      setStudentsData(students);
      setShowSheetSelector(false);
      setProcessingProgress(100);
      showToast("Tải sheet thành công!");
      
      // Delay closing processing state for feedback
      setTimeout(() => {
        setIsProcessingFile(false);
      }, 500);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "Lỗi xử lý dữu liệu sheet!";
      setFileError(msg);
      showToast(msg, "error");
      setIsProcessingFile(false);
      setOriginalFileName("");
    }
  }, 100);
};

  // Config Actions
  const detectMappings = (h: string[]) => {
    const mapping = {
      name: "", 
      studentId: "", 
      periods: {
        GK1: { score: "", level: "", comment: "" },
        CK1: { score: "", level: "", comment: "" },
        GK2: { score: "", level: "", comment: "" },
        CK2: { score: "", level: "", comment: "" },
        CN: { score: "", level: "", comment: "" },
      }
    };

    const findBestMatch = (headers: string[], keywords: string[]) => {
      const cleanHeaders = headers.map(h => ({
        original: h,
        clean: removeAccents(h.toLowerCase().trim()).replace(/[^a-z0-9 ]/g, ' ')
      }));

      const cleanKeywords = keywords.map(k => removeAccents(k.toLowerCase().trim()).replace(/[^a-z0-9 ]/g, ' '));

      // Priority 1: Exact match (after cleaning)
      for (const k of cleanKeywords) {
        const match = cleanHeaders.find(h => h.clean === k);
        if (match) return match.original;
      }

      // Priority 2: Header contains the keyword precisely (with word boundaries if possible)
      for (const k of cleanKeywords) {
        const match = cleanHeaders.find(h => new RegExp(`\\b${k}\\b`).test(h.clean));
        if (match) return match.original;
      }

      // Priority 3: Fuzzy contains
      for (const k of cleanKeywords) {
        const match = cleanHeaders.find(h => h.clean.includes(k));
        if (match) return match.original;
      }

      return "";
    };

    // Global fields
    mapping.name = findBestMatch(h, ["Họ và tên", "Họ tên", "Tên học sinh", "Họ tên học sinh", "Tên", "Full Name", "Student Name", "Name", "Ho va Ten", "First Name", "Last Name"]);
    mapping.studentId = findBestMatch(h, ["Mã học sinh", "Mã số học sinh", "Mã số", "MSHS", "Mã HS", "Số hiệu", "Mã định danh", "Mã định danh học sinh", "Mã định danh cá nhân", "ID", "Student ID", "SIS ID", "Ma HS", "Ma so HS"]);

    // Period specific fields
    let lastDetectedPeriod: "GK1" | "CK1" | "GK2" | "CK2" | "CN" | null = null;
    h.forEach((col) => {
      const clean = removeAccents(col.toLowerCase().trim());
      
      const gk1 = ["gk1", "giua ky 1", "giua ki 1", "giua hoc ky 1", "giua hk1", "g.ky 1", "gky 1", "midterm 1", "mid-term 1", "gk i", "giua ky i"];
      const ck1 = ["ck1", "cuoi ky 1", "cuoi ki 1", "cuoi hoc ky 1", "hk1", "hoc ky 1", "cuoi hk1", "c.ky 1", "cky 1", "final 1", "semester 1", "hoc ky i", "ck i", "cuoi ky i"];
      const gk2 = ["gk2", "giua ky 2", "giua ki 2", "giua hoc ky 2", "giua hk2", "g.ky 2", "gky 2", "midterm 2", "mid-term 2", "gk ii", "giua ky ii"];
      const ck2 = ["ck2", "cuoi ky 2", "cuoi ki 2", "cuoi hoc ky 2", "hk2", "hoc ky 2", "cuoi hk2", "c.ky 2", "cky 2", "final 2", "semester 2", "hoc ky ii", "ck ii", "cuoi ky ii"];
      const cn = ["cn", "ca nam", "ca hoc ky", "cuoi nam", "tong ket nam", "year end", "final grade", "ket qua ca nam"];
      
      let periodInCol: "GK1" | "CK1" | "GK2" | "CK2" | "CN" | null = null;
      if (gk1.some(k => clean.includes(removeAccents(k)))) periodInCol = "GK1";
      else if (ck1.some(k => clean.includes(removeAccents(k)))) periodInCol = "CK1";
      else if (gk2.some(k => clean.includes(removeAccents(k)))) periodInCol = "GK2";
      else if (ck2.some(k => clean.includes(removeAccents(k)))) periodInCol = "CK2";
      else if (cn.some(k => clean.includes(removeAccents(k)))) periodInCol = "CN";

      if (periodInCol) lastDetectedPeriod = periodInCol;
      const targetPeriod = periodInCol || lastDetectedPeriod || "CK2";
      
      const commentKeywords = ["nhan xet", "nx", "danh gia", "loi phe", "noi dung", "nhan xet mon hoc", "y kien", "comment", "feedback", "remarks", "note", "nhan xet chi tiet"];
      const levelKeywords = ["muc dat", "xep loai", "xl", "muc", "danh gia ky", "ket qua", "muc do dat duoc", "phan loai", "rating", "performance", "level", "muc do", "xep loai hoc luc"];
      const scoreKeywords = ["diem", "ktdk", "kt ", "kiem tra", "ck", "gk", "diểm", "score", "diem so", "mark", "grade", "diem trung binh", "dtb"];
      
      // Priority check for specific requested defaults
      if (clean === "kt ck2" || clean === "diem ck2") {
        mapping.periods.CK2.score = col;
        return;
      }
      if (clean === "xl ck2" || clean === "muc ck2") {
        mapping.periods.CK2.level = col;
        return;
      }
      if (clean === "nhan xet") {
        mapping.periods[targetPeriod].comment = col;
        return;
      }

      const isComment = commentKeywords.some(k => clean.includes(removeAccents(k)));
      const isLevel = !isComment && levelKeywords.some(k => clean.includes(removeAccents(k)));
      const isScore = !isComment && !isLevel && scoreKeywords.some(k => clean.includes(removeAccents(k)));

      if (isComment) {
        if (!mapping.periods[targetPeriod].comment || periodInCol) mapping.periods[targetPeriod].comment = col;
      } else if (isLevel) {
        if (!mapping.periods[targetPeriod].level || periodInCol) mapping.periods[targetPeriod].level = col;
      } else if (isScore) {
        if (!mapping.periods[targetPeriod].score || periodInCol) mapping.periods[targetPeriod].score = col;
      }
    });

    return mapping;
  };

  const autoMap = () => {
    if (!headers.length) return;
    setColMapping(detectMappings(headers));
    showToast("Đã tự động ánh xạ lại các cột!");
  };

  const clearMappings = () => {
    setColMapping({
      name: "",
      studentId: "",
      periods: {
        GK1: { score: "", level: "", comment: "" },
        CK1: { score: "", level: "", comment: "" },
        GK2: { score: "", level: "", comment: "" },
        CK2: { score: "", level: "", comment: "" },
        CN: { score: "", level: "", comment: "" },
      }
    });
    showToast("Đã xóa toàn bộ ánh xạ!");
  };

  const saveAsDefault = () => {
    localStorage.setItem('report_helper_default_config', JSON.stringify({
      subject,
      gradeLevel,
      colMapping
    }));
    showToast("Đã lưu cấu hình làm mặc định!");
  };

  const loadDefault = () => {
    const saved = localStorage.getItem('report_helper_default_config');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.subject) setSubject(config.subject);
        if (config.gradeLevel) setGradeLevel(config.gradeLevel);
        if (config.colMapping) {
          // If we have headers, we should only apply mappings that exist in the current headers
          if (headers.length > 0) {
            const mapped = { ...config.colMapping };
            const hSet = new Set(headers);
            if (mapped.name && !hSet.has(mapped.name)) mapped.name = "";
            if (mapped.studentId && !hSet.has(mapped.studentId)) mapped.studentId = "";
            
            (["GK1", "CK1", "GK2", "CK2", "CN"] as const).forEach(p => {
              if (mapped.periods[p].score && !hSet.has(mapped.periods[p].score)) mapped.periods[p].score = "";
              if (mapped.periods[p].level && !hSet.has(mapped.periods[p].level)) mapped.periods[p].level = "";
              if (mapped.periods[p].comment && !hSet.has(mapped.periods[p].comment)) mapped.periods[p].comment = "";
            });
            setColMapping(mapped);
          } else {
            setColMapping(config.colMapping);
          }
        }
        showToast("Đã tải cấu hình mặc định!");
      } catch (e) {
        showToast("Lỗi khi tải mặc định!", "error");
      }
    } else {
      showToast("Chưa có cấu hình mặc định nào được lưu!", "error");
    }
  };

  const generateSingleComment = useCallback((s: StudentData, period: "GK1" | "CK1" | "GK2" | "CK2" | "CN") => {
    const pMap = colMapping.periods[period];
    let scoreStr = pMap.score ? String(s[pMap.score]).replace(',', '.') : "";
    let levelStr = pMap.level ? String(s[pMap.level]).toUpperCase().trim() : "";
    
    const isMidTerm = period.startsWith("GK");
    const isYearEnd = period === "CN";
    let category = "";
    if (scoreStr && !isNaN(parseFloat(scoreStr)) && !isMidTerm) {
      const score = parseFloat(scoreStr);
      if (score >= 9) category = "excellent";
      else if (score >= 7) category = "good";
      else if (score >= 5) category = "fair";
      else category = "poor";
    } else if (levelStr) {
      if (levelStr === 'T' || levelStr.includes('TỐT') || levelStr === 'HTX' || levelStr === 'HTT') category = "excellent";
      else if (levelStr === 'H' || levelStr.trim() === 'HT' || levelStr.includes('HOÀN THÀNH')) category = Math.random() > 0.5 ? "good" : "fair";
      else if (levelStr === 'C' || levelStr.includes('CHƯA') || levelStr === 'CHT') category = "poor";
    } else {
      category = Math.random() > 0.3 ? "good" : "fair";
    }

    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const subjectData = bankSubjects[subject] || bankSubjects["Toán"];
    const gradeData = subjectData[gradeLevel] || subjectData["general"];
    
    let list = [];
    if (isYearEnd) {
      const yearEndData = (gradeData as any).yearEnd || { excellent: [], good: [], fair: [], poor: [] };
      list = yearEndData[category] || gradeData[category] || gradeData["fair"];
    } else {
      list = gradeData[category] || gradeData["fair"];
    }

    let rawComment = getRandom(list && list.length > 0 ? list : (gradeData[category] || gradeData["fair"]));
    let comment = rawComment;

    if (aiConfig.includeName && colMapping.name) {
      const fullName = String(s[colMapping.name] || "").trim();
      if (fullName) {
        // Extract just the first/calling name if possible, or use full name
        const nameParts = fullName.split(' ');
        const callingName = nameParts[nameParts.length - 1];
        
        // Randomly choose between "Em [Tên], ..." and "[Lời nhận xét] ([Tên])" or just prefixing
        const style = Math.random();
        if (style > 0.6) {
          comment = `Em ${callingName}, ${rawComment.charAt(0).toLowerCase()}${rawComment.slice(1)}`;
        } else if (style > 0.3) {
          comment = `${rawComment} (${callingName})`;
        } else {
          comment = `${callingName} ${rawComment.charAt(0).toLowerCase()}${rawComment.slice(1)}`;
        }
      }
    }

    return { category, comment };
  }, [subject, gradeLevel, colMapping, bankSubjects, bankCompetencies, bankQualities, aiConfig.includeName]);

  const processComments = () => {
    if (!colMapping.name) {
      showToast("Chưa cấu hình cột Họ tên!", "error");
      return;
    }

    if (selectedPeriods.size === 0) {
      showToast("Vui lòng chọn ít nhất một kỳ đánh giá!", "error");
      return;
    }

    // Validation: Check if mapped columns exist in current headers
    const hSet = new Set(headers);
    const missing: string[] = [];
    
    if (colMapping.name && !hSet.has(colMapping.name)) missing.push(`Họ tên (${colMapping.name})`);
    if (colMapping.studentId && !hSet.has(colMapping.studentId)) missing.push(`Mã số (${colMapping.studentId})`);

    const activePeriods = Array.from(selectedPeriods);
    activePeriods.forEach(p => {
      const pMap = colMapping.periods[p];
      if (!pMap.comment) {
        missing.push(`Cột nhận xét cho ${p} chưa được chọn`);
        return;
      }
      if (pMap.score && !hSet.has(pMap.score)) missing.push(`${p} Điểm (${pMap.score})`);
      if (pMap.level && !hSet.has(pMap.level)) missing.push(`${p} Mức (${pMap.level})`);
      if (pMap.comment && !hSet.has(pMap.comment)) missing.push(`${p} Nhận xét (${pMap.comment})`);
    });

    if (missing.length > 0) {
      showToast(`Lỗi cấu hình cột: ${missing.join(", ")}`, "error");
      return;
    }

    if (useAI) {
      handleAIProcessing();
      return;
    }

    const newStudents = studentsData.map(s => {
      const name = String(s[colMapping.name] || "").trim();
      if (!name || name.toLowerCase().includes('tổng')) return s;

      let updatedStudent = { ...s };

      selectedPeriods.forEach(period => {
        const pMap = colMapping.periods[period];
        if (!pMap.comment) return;

        // Skip if not overwriting and already has content
        if (!overwriteExisting && String(updatedStudent[pMap.comment] || "").trim()) return;

        const { comment } = generateSingleComment(s, period);
        updatedStudent[pMap.comment] = comment;

        if (autoLevel && pMap.level && !period.startsWith("GK")) {
          const scoreStr = pMap.score ? String(s[pMap.score]).replace(',', '.') : "";
          const scoreValue = parseFloat(scoreStr);
          if (!isNaN(scoreValue)) {
            updatedStudent[pMap.level] = scoreValue >= 7 ? 'T' : (scoreValue >= 5 ? 'H' : 'C');
          }
        }
      });

      return updatedStudent;
    });

    setStudentsData(newStudents);
    setIsProcessed(true);
    showToast(`Đã tạo nhận xét cho ${newStudents.length} học sinh!`);
  };

  const handleSingleRegenerate = async () => {
    if (!editingStudent) return;
    setIsRegeneratingSingle(true);
    try {
      const { idx, period } = editingStudent;
      const s = studentsData[idx];
      const pMap = colMapping.periods[period];
      
      const scoreStr = pMap.score ? String(s[pMap.score]).replace(',', '.') : "";
      const levelStr = pMap.level ? String(s[pMap.level]).toUpperCase().trim() : "";

      const { generateAIComment } = await import('./services/geminiService');
      const comment = await generateAIComment({
        studentName: String(s[colMapping.name]),
        subject,
        score: scoreStr,
        level: levelStr,
        period,
        gradeLevel,
        config: aiConfig
      });

      const newS = [...studentsData];
      newS[idx] = { ...newS[idx], [pMap.comment]: comment };
      setStudentsData(newS);
      showToast("Đã tạo nhận xét mới!");
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "Lỗi khi gọi AI!", "error");
    } finally {
      setIsRegeneratingSingle(false);
    }
  };

  const handleAIProcessing = async () => {
    setIsGeneratingAI(true);
    const activePeriods = Array.from(selectedPeriods);
    let updatedStudents = [...studentsData];

    try {
      for (const p of activePeriods) {
        const period = p as "GK1" | "CK1" | "GK2" | "CK2";
        const pMap = colMapping.periods[period];
        if (!pMap.comment) continue;

        const studentsToRequest: GenerateCommentParams[] = updatedStudents
          .filter(s => {
            const name = String(s[colMapping.name] || "").trim();
            if (!name || name.toLowerCase().includes('tổng')) return false;
            
            // If not overwriting, only include if current comment column is empty
            if (!overwriteExisting) {
              const currentComment = String(s[pMap.comment] || "").trim();
              if (currentComment) return false;
            }
            
            return true;
          })
          .map(s => {
            const scoreStr = pMap.score ? String(s[pMap.score]).replace(',', '.') : "";
            const levelStr = pMap.level ? String(s[pMap.level]).toUpperCase().trim() : "";
            
            return {
              studentName: String(s[colMapping.name]),
              subject,
              score: scoreStr,
              level: levelStr,
              period,
              gradeLevel
            };
          });

        if (studentsToRequest.length === 0) continue;

        // Process in batches of 20 to avoid prompt limits and speed up
        const batchSize = 20;
        const results: string[] = [];
        
        for (let i = 0; i < studentsToRequest.length; i += batchSize) {
          const batch = studentsToRequest.slice(i, i + batchSize);
          const batchComments = await generateAICommentsBatch(batch, aiConfig);
          results.push(...batchComments);
        }

        let resultIdx = 0;
        updatedStudents = updatedStudents.map(s => {
          const name = String(s[colMapping.name] || "").trim();
          if (!name || name.toLowerCase().includes('tổng')) return s;

          // Check if this student was skipped due to existing comment
          if (!overwriteExisting) {
            const currentComment = String(s[pMap.comment] || "").trim();
            if (currentComment) return s;
          }

          if (resultIdx >= results.length) return s;

          const comment = results[resultIdx++];
          let updated = { ...s, [pMap.comment]: comment };

          if (autoLevel && pMap.level && !period.startsWith("GK")) {
            const scoreStr = pMap.score ? String(s[pMap.score]).replace(',', '.') : "";
            const scoreValue = parseFloat(scoreStr);
            if (!isNaN(scoreValue)) {
              updated[pMap.level] = scoreValue >= 7 ? 'T' : (scoreValue >= 5 ? 'H' : 'C');
            }
          }
          return updated;
        });
      }

      setStudentsData(updatedStudents);
      setIsProcessed(true);
      showToast(`Đã tạo nhận xét AI cho ${updatedStudents.length} học sinh!`);
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "Lỗi khi gọi AI Gemini!", "error");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const exportExcel = () => {
    if (!workbook || !sheetName) return;
    const executeExport = () => {
      const newData = [...rawDataAOA];
      
      studentsData.forEach(s => {
        const rIdx = s._rowIndex;
        
        // If filtering empty, check if we should skip updates for this row
        if (filterEmptyComments) {
          const hasAnyComment = Array.from(selectedPeriods).some(period => {
            const pMap = colMapping.periods[period];
            return (s[pMap.comment] || "").trim().length > 0;
          });
          if (!hasAnyComment) return;
        }

        selectedPeriods.forEach(period => {
          const pMap = colMapping.periods[period];
          const commentIdx = headers.indexOf(pMap.comment);
          const levelIdx = headers.indexOf(pMap.level);

          if (commentIdx !== -1) {
            while (newData[rIdx].length <= commentIdx) newData[rIdx].push("");
            newData[rIdx][commentIdx] = s[pMap.comment];
          }

          if (levelIdx !== -1 && autoLevel && !period.startsWith("GK")) {
            while (newData[rIdx].length <= levelIdx) newData[rIdx].push("");
            newData[rIdx][levelIdx] = s[pMap.level];
          }
        });
      });

      const ws = workbook.Sheets[sheetName];
      XLSX.utils.sheet_add_aoa(ws, newData, {origin: "A1"});
      
      const lastDot = originalFileName.lastIndexOf('.');
      const fileName = lastDot !== -1 
        ? `${originalFileName.substring(0, lastDot)} - xong${originalFileName.substring(lastDot)}`
        : `${originalFileName} - xong.xlsx`;

      XLSX.writeFile(workbook, fileName);
      showToast("Đã tải file Excel!");
      setShowConfirm(null);
    };

    setShowConfirm({type: 'all', action: executeExport});
  };

  const exportCommentsOnly = () => {
    if (!studentsData.length || selectedPeriods.size === 0) return;

    const executeExport = () => {
      const periodList = Array.from(selectedPeriods);
      const exportHeaders = ["STT", "Họ và Tên"];
      periodList.forEach(p => {
        exportHeaders.push(`${p} - Điểm`);
        exportHeaders.push(`${p} - Nhận xét`);
      });

      const exportRows = studentsData
        .filter(s => {
          const name = String(s[colMapping.name] || "");
          if (!name || name.toLowerCase().includes('tổng')) return false;
          if (filterEmptyComments) {
            return periodList.some(p => {
              const pMap = colMapping.periods[p];
              return (s[pMap.comment] || "").trim().length > 0;
            });
          }
          return true;
        })
        .map((s, idx) => {
          const row = [idx + 1, s[colMapping.name]];
          periodList.forEach(p => {
            const pMap = colMapping.periods[p];
            row.push(s[pMap.score] || "");
            row.push(s[pMap.comment] || "");
          });
          return row;
        });
      
      const aoa = [exportHeaders, ...exportRows];
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Nhận xét");
      
      const fileName = `Danh sách nhận xét tổng hợp - ${subject}.xlsx`;
      XLSX.writeFile(wb, fileName);
      showToast("Đã xuất danh sách nhận xét riêng!");
      setShowConfirm(null);
    };

    setShowConfirm({type: 'comments', action: executeExport});
  };

  const copyAll = () => {
    if (selectedPeriods.size === 0) return;
    const period = Array.from(selectedPeriods)[0]; // Copy for the first selected period
    const pMap = colMapping.periods[period];
    
    const text = studentsData
      .filter(s => {
        const name = String(s[colMapping.name] || "");
        if (!name || name.toLowerCase().includes('tổng')) return false;
        if (filterEmptyComments) {
          return (s[pMap.comment] || "").trim().length > 0;
        }
        return true;
      })
      .map(s => `${s[colMapping.name]}:\t${s[pMap.comment]}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    showToast(`Đã copy nhận xét của ${period}!`);
  };

  const reset = () => {
    setRawDataAOA([]);
    setStudentsData([]);
    setOriginalFileName("");
    setIsProcessed(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AutoComment VnEdu</h1>
              <p className="text-xs text-blue-100 font-medium">Bản nâng cấp Thông tư 27</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-blue-700/50 px-3 py-1.5 rounded-full border border-blue-400/30 text-sm">
            <CheckCircle size={14} className="text-green-400" />
            <span>Chuẩn dữ liệu Học bạ</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowingSettings(true)}
              className="flex items-center gap-2 bg-blue-700/50 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-blue-400/30"
              title="Cài đặt khóa API và hệ thống"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Cài đặt</span>
            </button>
            <button 
              onClick={() => setShowingHelp(true)}
              className="flex items-center gap-2 bg-blue-700/50 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-blue-400/30"
            >
              <HelpCircle size={18} />
              <span className="hidden sm:inline">Hướng dẫn</span>
            </button>
            <button 
              onClick={() => setManagingLibrary(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Thư viện nhận xét</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Upload */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="font-semibold text-gray-700">Tải bảng điểm Excel</h2>
            </div>
            
            {isProcessingFile ? (
              <div className="flex-grow border-2 border-blue-200 rounded-xl bg-blue-50/30 flex flex-col items-center justify-center p-8 space-y-4">
                <RefreshCw size={32} className="text-blue-500 animate-spin" />
                <div className="w-full max-w-[200px] bg-blue-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${processingProgress}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Đang xử lý {processingProgress}%</p>
                <p className="text-[10px] text-blue-500 text-center">Vui lòng đợi trong giây lát...</p>
              </div>
            ) : !originalFileName ? (
              <div className="flex flex-col gap-3 flex-grow">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex-grow cursor-pointer border-2 border-dashed rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 transition-all hover:border-blue-400 hover:bg-blue-50",
                    fileError ? "border-red-200 bg-red-50/30" : "border-gray-200"
                  )}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => e.target.files?.[0] && handleFiles(e.target.files[0])}
                  />
                  <div className={cn(
                    "p-4 rounded-full mb-4",
                    fileError ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {fileError ? <FileCheck size={32} /> : <Upload size={32} />}
                  </div>
                  <p className="text-sm font-medium text-gray-600">Chọn file từ máy tính</p>
                  <p className="text-xs text-gray-400 mt-1">Hỗ trợ: .xlsx, .xls</p>
                </div>

                {fileError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2"
                  >
                    <X className="text-red-500 shrink-0 mt-0.5" size={14} />
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold text-red-700 uppercase leading-none mb-1">Lỗi tệp tin</p>
                      <p className="text-[11px] text-red-600 leading-tight">{fileError}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg flex-shrink-0">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-green-800 truncate">{originalFileName}</p>
                    <p className="text-xs text-green-600">{studentsData.length} học sinh</p>
                  </div>
                </div>
                <button onClick={reset} className="text-gray-400 hover:text-red-500 p-1">
                  <X size={18} />
                </button>
              </div>
            )}
          </section>

          {/* Step 2: Config */}
          <section className={cn(
            "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2 flex flex-col gap-6 transition-all",
            !originalFileName && "opacity-50 pointer-events-none grayscale"
          )}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="font-semibold text-gray-700">Cấu hình & Tùy chọn</h2>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", colMapping.name ? "bg-green-500 shadow-sm shadow-green-200" : "bg-red-400 blur-[1px]")} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase leading-none">Vắn tắt</span>
                  </div>
                  <div className="h-4 w-[1px] bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", selectedPeriods.size > 0 ? "bg-green-500 shadow-sm shadow-green-200" : "bg-red-400 blur-[1px]")} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase leading-none">Kỳ học</span>
                  </div>
                  <div className="h-4 w-[1px] bg-gray-200" />
                  <button 
                    onClick={processComments}
                    disabled={isGeneratingAI}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-blue-100 active:scale-95"
                  >
                    {isGeneratingAI ? <RefreshCw size={12} className="animate-spin" /> : <Wand2 size={12} />}
                    Tạo ngay
                  </button>
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subject & Grade */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <BookOpen size={14} className="text-blue-500" />
                    1. Môn học đang xử lý
                  </label>
                  <CustomSelect 
                    value={subject}
                    onChange={setSubject}
                    options={Object.keys(ALL_SUBJECTS_BANK)}
                    placeholder="Chọn môn học"
                    variant="blue"
                    icon={<Book size={14} />}
                  />
                  <p className="text-[9px] text-gray-400 mt-2 px-1 italic">Hệ thống sẽ lấy câu mẫu từ môn này trong thư viện.</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <GraduationCap size={14} className="text-purple-500" />
                    2. Khối lớp
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["1", "2", "3", "4", "5", "general"].map(level => (
                      <button
                        key={level}
                        onClick={() => setGradeLevel(level)}
                        className={cn(
                          "px-2 py-2 rounded-xl text-[10px] font-bold border transition-all flex flex-col items-center justify-center gap-1",
                          gradeLevel === level 
                            ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-100 scale-[1.02]"
                            : "bg-gray-50 border-gray-100 text-gray-500 hover:border-purple-200 hover:bg-white"
                        )}
                      >
                        <span className="opacity-80">Khối</span>
                        <span className="text-xs">{level === "general" ? "Chung" : level}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Period & Toggles */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    <Calendar size={14} className="text-orange-500" />
                    3. Kỳ đánh giá
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(["GK1", "CK1", "GK2", "CK2", "CN"] as const).map((period) => (
                      <button 
                        key={period}
                        onClick={() => {
                          const newSet = new Set(selectedPeriods);
                          if (newSet.has(period)) newSet.delete(period);
                          else newSet.add(period);
                          setSelectedPeriods(newSet);
                        }}
                        className={cn(
                          "flex items-center justify-between px-2 py-2 rounded-xl border transition-all group relative overflow-hidden",
                          selectedPeriods.has(period) 
                            ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm ring-1 ring-orange-100" 
                            : "bg-gray-50 border-gray-100 text-gray-400 hover:border-orange-200 hover:bg-white"
                        )}
                      >
                        <div className="flex flex-col items-start min-w-0">
                          <span className="text-[9px] font-black">{period}</span>
                          <span className="text-[7px] opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">
                            {period === 'CN' ? 'Cả năm' : (period.startsWith('G') ? 'Giữa kỳ' : 'Cuối kỳ')}
                          </span>
                        </div>
                        {selectedPeriods.has(period) ? (
                          <CheckCircle size={10} className="text-orange-500" />
                        ) : (
                          <PlusCircle size={10} className="text-gray-200 group-hover:text-orange-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={autoLevel} 
                      onChange={e => setAutoLevel(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-600 font-medium group-hover:text-blue-600 transition-colors cursor-help" title="Áp dụng cho CK1, CK2: >=7: T, >=5: H, <5: C">Tự điền cột Mức (T, H, C) từ Điểm số</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={overwriteExisting} 
                      onChange={e => setOverwriteExisting(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="text-xs text-gray-600 font-medium group-hover:text-orange-600 transition-colors">Ghi đè lên các nhận xét đã có sẵn</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={aiConfig.includeName}
                      onChange={e => setAIConfig({ ...aiConfig, includeName: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-bold group-hover:text-blue-700 transition-colors flex items-center gap-1">
                        <User size={12} />
                        Chèn tên học sinh vào nhận xét
                      </span>
                      <span className="text-[9px] text-gray-400 italic">Áp dụng cho cả AI và Ngân hàng nhận xét</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={useAI} 
                      onChange={e => setUseAI(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-indigo-600 font-bold group-hover:text-indigo-700 transition-colors flex items-center gap-1">
                        <Wand2 size={12} />
                        Sử dụng AI (Gemini)
                      </span>
                      <span className="text-[9px] text-gray-400">Tự động viết nhận xét đa dạng, thông minh</span>
                    </div>
                  </label>

                  {useAI && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-2 p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col gap-3"
                    >
                      {!hasApiKey && (
                        <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex flex-col gap-2 shadow-sm">
                          <div className="flex items-center gap-2 text-red-600">
                            <Key size={14} />
                            <span className="text-[11px] font-bold">Chưa cấu hình API Key</span>
                          </div>
                          <p className="text-[10px] text-red-700 leading-relaxed">
                            Vui lòng thiết lập <b>GEMINI_API_KEY</b> trong phần <b>Cài đặt</b> để sử dụng tính năng AI này.
                          </p>
                          <button 
                            onClick={() => setShowingSettings(true)}
                            className="bg-red-600 text-white py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-700 transition-colors"
                          >
                            Thiết lập ngay
                          </button>
                        </div>
                      )}
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Giọng điệu</label>
                        <select 
                          value={aiConfig.tone}
                          onChange={e => setAIConfig({ ...aiConfig, tone: e.target.value as any })}
                          className="w-full text-xs p-1.5 rounded border border-indigo-200 bg-white"
                        >
                          <option value="encouraging">Khích lệ (Mặc định)</option>
                          <option value="cheerful">Vui vẻ, phấn khởi</option>
                          <option value="serious">Nghiêm túc, chuẩn mực</option>
                          <option value="neutral">Khách quan, trung tính</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Độ dài</label>
                        <select 
                          value={aiConfig.length}
                          onChange={e => setAIConfig({ ...aiConfig, length: e.target.value as any })}
                          className="w-full text-xs p-1.5 rounded border border-indigo-200 bg-white"
                        >
                          <option value="short">Ngắn gọn</option>
                          <option value="medium">Vừa phải</option>
                          <option value="long">Chi tiết</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Từ khóa cần tránh</label>
                        <input 
                          type="text"
                          placeholder="vấp, yếu, kém... (cách nhau bằng dấu phẩy)"
                          value={avoidKeywordsInput}
                          onChange={e => {
                            setAvoidKeywordsInput(e.target.value);
                            setAIConfig({ 
                              ...aiConfig, 
                              avoidKeywords: e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0) 
                            });
                          }}
                          className="w-full text-xs p-1.5 rounded border border-indigo-200 bg-white placeholder:text-[10px]"
                        />
                      </div>
                      <div className="pt-1 border-t border-indigo-100/50">
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Heart size={10} fill="currentColor" />
                            Nhận xét nền tảng
                          </span>
                          <span className="text-[8px] normal-case font-medium text-indigo-300">
                            {aiConfig.foundationalComments?.length || 0}/3 câu được chọn
                          </span>
                        </label>
                        
                        <div className="relative mb-2">
                          <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-indigo-300" />
                          <input 
                            type="text"
                            placeholder="Tìm trong thư viện..."
                            value={foundationSearch}
                            onChange={e => setFoundationSearch(e.target.value)}
                            className="w-full text-[9px] pl-6 pr-6 py-1.5 rounded-lg border border-indigo-100 bg-white/50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-200 transition-all"
                          />
                          {foundationSearch && (
                            <button 
                              onClick={() => setFoundationSearch("")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-indigo-600"
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>

                        {availableFoundationalComments.length === 0 ? (
                          <p className="text-[9px] text-gray-400 italic py-2 text-center bg-white/50 rounded border border-dashed border-indigo-100">
                            {foundationSearch ? "Không tìm thấy kết quả" : "Chưa có nhận xét mẫu nào."}
                          </p>
                        ) : (
                          <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                            {availableFoundationalComments.map((c, i) => (
                              <label key={i} className={cn(
                                "flex items-start gap-2 p-1.5 rounded text-left transition-all border cursor-pointer",
                                aiConfig.foundationalComments?.includes(c.text)
                                  ? "bg-indigo-100 border-indigo-200 shadow-sm"
                                  : "bg-white border-indigo-50 hover:bg-indigo-50 hover:border-indigo-100"
                              )}>
                                <input 
                                  type="checkbox"
                                  className="mt-1 w-3 h-3 rounded text-indigo-600 border-gray-300 focus:ring-indigo-400 accent-indigo-600"
                                  checked={aiConfig.foundationalComments?.includes(c.text)}
                                  onChange={(e) => {
                                    const current = aiConfig.foundationalComments || [];
                                    if (e.target.checked) {
                                      if (current.length >= 3) {
                                        showToast("Tối đa 3 mẫu để đảm bảo chất lượng", "error");
                                        return;
                                      }
                                      setAIConfig({ ...aiConfig, foundationalComments: [...current, c.text] });
                                    } else {
                                      setAIConfig({ ...aiConfig, foundationalComments: current.filter(t => t !== c.text) });
                                    }
                                  }}
                                />
                                <div className="flex flex-col min-w-0">
                                  <div className="flex items-center gap-1 mb-0.5">
                                    <span className={cn(
                                      "text-[7px] font-black uppercase truncate max-w-[100px]",
                                      c.type === 'sample' ? "text-amber-500" : 
                                      c.type === 'personal' ? "text-indigo-400" : "text-blue-400"
                                    )}>
                                      {c.category}
                                    </span>
                                    {c.type === 'sample' && <StarIcon size={6} className="text-amber-400 fill-amber-400" />}
                                    {c.type === 'personal' && <Heart size={6} className="text-indigo-400 fill-indigo-400 shadow-sm" />}
                                  </div>
                                  <span className="text-[9px] leading-tight text-gray-700 line-clamp-3">{c.text}</span>
                                </div>
                                {(c as any).id && c.type === 'personal' && (
                                  <button 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (confirm("Xóa nhận xét này khỏi thư viện?")) {
                                        deletePersonalComment((c as any).id);
                                      }
                                    }}
                                    className="ml-auto p-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Xóa khỏi thư viện"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                )}
                              </label>
                            ))}
                          </div>
                        )}
                        {aiConfig.foundationalComments && aiConfig.foundationalComments.length > 0 && (
                          <button 
                            onClick={() => setAIConfig({ ...aiConfig, foundationalComments: [] })}
                            className="mt-2 w-full py-1 text-[8px] font-bold text-indigo-400 hover:text-indigo-600 transition-colors"
                          >
                            Xóa tất cả lựa chọn
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Column Mapping */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest italic">Ánh xạ cột Excel</span>
                    <span className="text-[9px] text-blue-400 font-medium">Kết nối tiêu đề file với hệ thống</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={saveAsDefault}
                      className="inline-flex items-center justify-center h-7 px-2.5 bg-white hover:bg-green-50 text-green-600 border border-green-100 text-[9px] font-bold rounded-lg transition-all shadow-sm"
                      title="Lưu ánh xạ hiện tại làm mặc định"
                    >
                      <Save size={10} className="mr-1" />
                      Lưu mẫu
                    </button>
                    <button 
                      onClick={loadDefault}
                      className="inline-flex items-center justify-center h-7 px-2.5 bg-white hover:bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-bold rounded-lg transition-all shadow-sm"
                      title="Tải cấu hình mặc định đã lưu"
                    >
                      <RotateCcw size={10} className="mr-1" />
                      Tải mẫu
                    </button>
                    <button 
                      onClick={autoMap}
                      className="inline-flex items-center justify-center h-7 px-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold rounded-lg transition-all shadow-sm"
                      title="Tự động nhận diện cột"
                    >
                      <RefreshCw size={10} className="mr-1" />
                      Tự động
                    </button>
                    <button 
                      onClick={clearMappings}
                      className="inline-flex items-center justify-center h-7 px-2.5 bg-white hover:bg-red-50 text-red-500 border border-red-100 text-[9px] font-bold rounded-lg transition-all shadow-sm"
                      title="Xóa tất cả ánh xạ"
                    >
                      <Trash2 size={10} className="mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar max-h-[500px]">
                  {/* Basic Info Group */}
                  <div className="bg-white/40 p-4 rounded-xl border border-blue-100/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={12} className="text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Thông tin học sinh</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <CustomSelect 
                        label="Họ và Tên (Bắt buộc)"
                        icon={<User size={12} />}
                        variant="green"
                        value={colMapping.name}
                        onChange={val => setColMapping(prev => ({...prev, name: val}))}
                        options={headers}
                        samples={sampleRow}
                      />
                      <CustomSelect 
                        label="Mã học sinh"
                        icon={<Hash size={12} />}
                        placeholder="Không có"
                        value={colMapping.studentId}
                        onChange={val => setColMapping(prev => ({...prev, studentId: val}))}
                        options={headers}
                        samples={sampleRow}
                      />
                    </div>
                  </div>

                  {/* Period Mappings */}
                  {Array.from(selectedPeriods).length > 0 ? (
                    <div className="space-y-3">
                      {(["GK1", "CK1", "GK2", "CK2", "CN"] as const).filter(p => selectedPeriods.has(p)).map(period => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={period} 
                          className="bg-white/80 p-4 rounded-xl border border-blue-200/50 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                              <span className="text-[11px] font-black text-gray-700 uppercase">Kỳ đánh giá: {period}</span>
                            </div>
                            <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">Đang chọn</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <CustomSelect 
                              label="Cột Điểm"
                              icon={<Award size={10} />}
                              placeholder="Chọn cột điểm"
                              variant="orange"
                              value={colMapping.periods[period].score}
                              onChange={val => {
                                const newMap = { ...colMapping };
                                newMap.periods[period].score = val;
                                setColMapping(newMap);
                              }}
                              options={headers}
                              samples={sampleRow}
                            />
                            <CustomSelect 
                              label="Cột Mức (T,H,C)"
                              icon={<Star size={10} />}
                              placeholder="Chọn cột mức"
                              variant="orange"
                              value={colMapping.periods[period].level}
                              onChange={val => {
                                const newMap = { ...colMapping };
                                newMap.periods[period].level = val;
                                setColMapping(newMap);
                              }}
                              options={headers}
                              samples={sampleRow}
                            />
                            <CustomSelect 
                              label="Ghi Nhận xét vào"
                              icon={<MessageSquare size={10} />}
                              placeholder="Chọn cột đích"
                              variant="blue"
                              value={colMapping.periods[period].comment}
                              onChange={val => {
                                const newMap = { ...colMapping };
                                newMap.periods[period].comment = val;
                                setColMapping(newMap);
                              }}
                              options={headers}
                              samples={sampleRow}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/40 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center flex flex-col items-center gap-3">
                      <Calendar size={32} className="text-blue-300" />
                      <p className="text-xs font-bold text-blue-500 uppercase">Vui lòng chọn kỳ đánh giá ở bảng bên trái</p>
                      <p className="text-[10px] text-gray-400">Hệ thống sẽ hiển thị các lựa chọn ánh xạ tương ứng sau khi bạn chọn kỳ học.</p>
                    </div>
                  )}
                </div>
                
                {/* Quick Helper */}
                <div className="mt-2 text-[9px] text-blue-500 italic bg-blue-100/30 p-2 rounded-lg border border-blue-100 flex items-center gap-2">
                   <HelpCircle size={10} />
                   <span>Mẹo: Bạn có thể xem dữ liệu mẫu ngay trong ô chọn để đảm bảo chọn đúng cột.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Data Table Section */}
        <AnimatePresence>
          {studentsData.length > 0 && (
            <motion.section 
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 20}}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-grow min-h-[500px]"
            >
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <h2 className="font-semibold text-gray-700">Dữ liệu học sinh</h2>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                    {studentsData.length} HS
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer ml-4 group">
                    <input 
                      type="checkbox" 
                      checked={filterEmptyComments} 
                      onChange={e => setFilterEmptyComments(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Ẩn HS chưa có NX</span>
                  </label>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => {
                      if (window.confirm("Xóa tất cả nhận xét hiện tại của tất cả học sinh?")) {
                        const newStudents = studentsData.map(s => {
                          let updated = {...s};
                          selectedPeriods.forEach(p => {
                            const pMap = colMapping.periods[p];
                            if (pMap.comment) updated[pMap.comment] = "";
                          });
                          return updated;
                        });
                        setStudentsData(newStudents);
                        showToast("Đã xóa toàn bộ nhận xét!");
                      }
                    }}
                    disabled={!isProcessed}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition-all"
                  >
                    <Trash2 size={16} />
                    Xóa hết
                  </button>
                  <button 
                    onClick={copyAll}
                    disabled={!isProcessed}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 transition-all"
                  >
                    <Copy size={16} className="text-blue-500" />
                    Copy
                  </button>
                  <button 
                    onClick={exportCommentsOnly}
                    disabled={!isProcessed}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 disabled:opacity-50 transition-all"
                  >
                    <FileSpreadsheet size={16} />
                    Xuất riêng nhận xét
                  </button>
                  <button 
                    onClick={exportExcel}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition shadow-lg shadow-green-100 active:scale-95"
                  >
                    <Download size={16} />
                    Lưu file
                  </button>
                </div>
              </div>

              <div className="overflow-auto table-container flex-grow relative">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-gray-50/80 backdrop-blur sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-100 font-bold text-gray-400 text-[10px] uppercase tracking-wider w-12 text-center">STT</th>
                      <th className="px-6 py-4 border-b border-gray-100 font-bold text-gray-400 text-[10px] uppercase tracking-wider w-40">Họ và Tên</th>
                      {((["GK1", "CK1", "GK2", "CK2", "CN"] as const).filter(p => selectedPeriods.has(p))).map(period => (
                        <th key={period} className="px-4 py-4 border-b border-gray-100 font-bold text-gray-400 text-[10px] uppercase tracking-wider min-w-[200px]">
                          Nhận xét {period}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentsData.map((s, idx) => {
                      const name = s[colMapping.name] || "";
                      if (String(name).toLowerCase().includes('tổng')) return null;
                      
                      // Skip if filtering empty and no comments in ANY selected period
                      if (filterEmptyComments) {
                        const hasAnyComment = Array.from(selectedPeriods).some(period => {
                          const pMap = colMapping.periods[period];
                          return (s[pMap.comment] || "").trim().length > 0;
                        });
                        if (!hasAnyComment) return null;
                      }

                      return (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4 text-gray-400 font-medium text-center">{idx + 1}</td>
                          <td className="px-6 py-4 font-semibold text-gray-700 group/name">
                            <div className="flex items-center justify-between gap-2 group/name-edit">
                              <input 
                                type="text"
                                value={name || ""}
                                onChange={(e) => {
                                  const newS = [...studentsData];
                                  newS[idx] = {...newS[idx], [colMapping.name]: e.target.value};
                                  setStudentsData(newS);
                                }}
                                className="w-full bg-transparent border-b border-transparent focus:border-blue-400 focus:bg-white px-1 py-0.5 outline-none font-semibold text-gray-700 transition-all"
                              />
                              <button 
                                onClick={() => {
                                  const newS = [...studentsData];
                                  let updatedStudent = {...newS[idx]};
                                  selectedPeriods.forEach(p => {
                                    const pMap = colMapping.periods[p];
                                    if (pMap.comment) updatedStudent[pMap.comment] = "";
                                  });
                                  newS[idx] = updatedStudent;
                                  setStudentsData(newS);
                                  showToast(`Đã xóa nhận xét của ${name}`);
                                }}
                                className="opacity-0 group-hover/name:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1"
                                title="Xóa tất cả nhận xét của HS này"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                          {((["GK1", "CK1", "GK2", "CK2", "CN"] as const).filter(p => selectedPeriods.has(p))).map(period => {
                            const pMap = colMapping.periods[period];
                            const level = s[pMap.level];
                            const levelColor = level === 'T' ? 'bg-green-100 text-green-700 border-green-200' : (level === 'H' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : (level === 'C' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-100 text-gray-500 border-gray-200'));

                            return (
                              <td key={period} className="px-4 py-4">
                                <div className="flex flex-col gap-2 relative group">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-black text-gray-400">{period}:</span>
                                      {pMap.score && (
                                        <div className="flex items-center gap-1">
                                          <span className="text-[10px] font-bold text-blue-600">Đ:</span>
                                          <input 
                                            type="text"
                                            value={s[pMap.score] || ""}
                                            onChange={(e) => {
                                              const newS = [...studentsData];
                                              newS[idx] = {...newS[idx], [pMap.score]: e.target.value};
                                              setStudentsData(newS);
                                            }}
                                            className="w-8 text-[10px] font-bold text-blue-700 bg-blue-50/50 border border-transparent hover:border-blue-200 focus:border-blue-400 outline-none rounded text-center py-0"
                                          />
                                        </div>
                                      )}
                                      {pMap.level && (
                                        <select
                                          value={level || ""}
                                          onChange={(e) => {
                                            const newS = [...studentsData];
                                            newS[idx] = {...newS[idx], [pMap.level]: e.target.value};
                                            setStudentsData(newS);
                                          }}
                                          className={cn("px-1 py-0.5 rounded text-[9px] font-bold border outline-none cursor-pointer", levelColor)}
                                        >
                                          <option value="">--</option>
                                          <option value="T">T</option>
                                          <option value="H">H</option>
                                          <option value="C">C</option>
                                        </select>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                      <button 
                                        onClick={() => setEditingStudent({idx, period})}
                                        className="text-blue-600 hover:text-blue-800 p-0.5 bg-blue-50 rounded"
                                        title="Mở thư viện nhận xét"
                                      >
                                        <Book size={12} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const pMap = colMapping.periods[period];
                                          const { comment } = generateSingleComment(s, period);
                                          const newS = [...studentsData];
                                          newS[idx] = {...newS[idx], [pMap.comment]: comment};
                                          setStudentsData(newS);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 p-0.5 bg-blue-50 rounded"
                                        title="Tạo lại nhận xét cho HS này"
                                      >
                                        <Wand2 size={12} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const pMap = colMapping.periods[period];
                                          const commentValue = s[pMap.comment];
                                          if (commentValue) savePersonalComment(commentValue, `${subject} - ${period}`);
                                        }}
                                        className="text-pink-500 hover:text-pink-700 p-0.5 bg-pink-50 rounded"
                                        title="Lưu vào thư viện cá nhân"
                                      >
                                        <Heart size={12} fill={personalComments.some(c => c.text === (s[colMapping.periods[period].comment] || "")) ? "currentColor" : "none"} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const newS = [...studentsData];
                                          newS[idx] = {...newS[idx], [pMap.comment]: ""};
                                          setStudentsData(newS);
                                        }}
                                        className="text-gray-300 hover:text-red-500 p-0.5"
                                        title={`Xóa nhận xét ${period}`}
                                      >
                                        <RotateCcw size={12} />
                                      </button>
                                    </div>
                                  </div>
                                  <textarea
                                    value={s[pMap.comment] || ""}
                                    onChange={(e) => {
                                      const newS = [...studentsData];
                                      newS[idx] = {...newS[idx], [pMap.comment]: e.target.value};
                                      setStudentsData(newS);
                                    }}
                                    placeholder={`Nhận xét ${period}...`}
                                    className={cn(
                                      "w-full bg-white border border-gray-100 rounded-lg p-2 text-[11px] outline-none transition-all focus:ring-1 focus:ring-blue-400 focus:border-blue-400 h-16 resize-none",
                                      !s[pMap.comment] && "text-gray-400 italic"
                                    )}
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showSheetSelector && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
              className="fixed top-1/2 left-1/2 z-[160] bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-lg border border-gray-100"
            >
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FileSpreadsheet size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Chọn bảng dữ liệu (Sheet)</h3>
              <p className="text-sm text-gray-500 text-center mb-8">
                File của bạn có nhiều trang tính. Vui lòng chọn sheet chứa danh sách điểm cần xử lý.
              </p>
              
              <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {availableSheets.map((sn) => (
                  <button
                    key={sn}
                    onClick={() => {
                      if (workbook) {
                        processSheet(workbook, sn);
                      }
                    }}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                        <FileSpreadsheet size={16} className="text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <span className="font-semibold text-gray-700 group-hover:text-blue-700">{sn}</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-300 -rotate-90 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => {
                    setShowSheetSelector(false);
                    setWorkbook(null);
                    setAvailableSheets([]);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-gray-400 hover:text-gray-600 transition-all"
                >
                  Hủy và chọn file khác
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setShowConfirm(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 z-[70] bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md border border-gray-100"
            >
              <motion.div 
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
              >
                <Download size={32} />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-gray-800 text-center mb-2"
              >
                Bạn muốn xuất file?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm text-gray-500 text-center mb-8 leading-relaxed"
              >
                {showConfirm.type === 'all' 
                  ? "Hệ thống sẽ ghi đè nhận xét vào file Excel gốc của bạn. Hãy đảm bảo bạn đã kiểm tra kỹ nội dung."
                  : "Hệ thống sẽ tạo một file Excel mới chỉ chứa danh sách nhận xét đã tạo."}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Hủy
                </button>
                <button 
                  onClick={showConfirm.action}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Đồng ý
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{opacity: 0, y: 50, scale: 0.9}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 50, scale: 0.9}}
            className={cn(
              "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border backdrop-blur-sm",
              toast.type === 'success' ? "bg-gray-900/90 text-white border-gray-800" : "bg-red-600 text-white border-red-500"
            )}
          >
            {toast.type === 'success' ? <FileCheck size={20} className="text-green-400" /> : <X size={20} />}
            <span className="text-sm font-semibold">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading AI Overlay */}
      <AnimatePresence>
        {isGeneratingAI && (
          <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-indigo-900/80 backdrop-blur-md z-[200] flex flex-col items-center justify-center text-white p-6"
          >
            <div className="relative mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-indigo-400 border-t-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center text-indigo-300">
                <Wand2 size={40} className="pulse-animation" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">AI đang sáng tác nhận xét...</h3>
            <p className="text-indigo-200 text-center max-w-sm">
              Gemini đang phân tích kết quả học tập và viết những lời nhận xét ý nghĩa nhất cho từng học sinh.
            </p>
            <p className="text-[10px] text-indigo-300/50 mt-12 uppercase tracking-widest font-black italic">Tuân thủ Thông tư 27 • Ngôn ngữ tích cực</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editingStudent && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setEditingStudent(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] bg-white rounded-3xl shadow-2xl z-[90] flex flex-col max-h-[90vh] overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
                <div>
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Book className="text-blue-600" size={20} />
                    Thư viện nhận xét - {editingStudent.period}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Học sinh: <span className="font-bold text-blue-600">{studentsData[editingStudent.idx][colMapping.name]}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setEditingStudent(null)}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Nội dung nhận xét hiện tại</h4>
                    <button 
                      onClick={() => {
                        const pMap = colMapping.periods[editingStudent.period];
                        const comment = studentsData[editingStudent.idx][pMap.comment];
                        if (comment) savePersonalComment(comment, `${subject} - ${editingStudent.period}`);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-full font-bold text-[9px] transition-all shadow-sm border border-pink-200"
                      title="Lưu nhận xét này vào thư viện của bạn"
                    >
                      <Heart size={10} fill={personalComments.some(c => c.text === (studentsData[editingStudent.idx][colMapping.periods[editingStudent.period].comment] || "")) ? "currentColor" : "none"} />
                      Lưu vào thư viện cá nhân
                    </button>
                  </div>
                  <textarea 
                    value={studentsData[editingStudent.idx][colMapping.periods[editingStudent.period].comment] || ""}
                    onChange={(e) => {
                      const newS = [...studentsData];
                      const pMap = colMapping.periods[editingStudent.period];
                      newS[editingStudent.idx] = { ...newS[editingStudent.idx], [pMap.comment]: e.target.value };
                      setStudentsData(newS);
                    }}
                    placeholder="Nhập hoặc chọn nhận xét từ thư viện bên dưới..."
                    className="w-full h-32 p-4 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none shadow-inner"
                  />
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Nhận xét môn học ({subject})</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["excellent", "good", "fair", "poor"].map(cat => {
                      const subjectData = bankSubjects[subject] || bankSubjects["Toán"];
                      const bank = subjectData[gradeLevel] || subjectData["general"];
                      const options = bank[cat] || [];
                      
                      return (
                        <div key={cat} className="space-y-2">
                          <div className={cn(
                            "text-[9px] font-bold px-2 py-0.5 rounded-full inline-block uppercase",
                            cat === 'excellent' ? "bg-green-100 text-green-700" :
                            cat === 'good' ? "bg-blue-100 text-blue-700" :
                            cat === 'fair' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          )}>
                            {cat === 'excellent' ? 'Hoàn thành tốt (9-10)' : 
                             cat === 'good' ? 'Khá - Tốt (7-8)' : 
                             cat === 'fair' ? 'Đạt (5-6)' : 'Cần cố gắng (<5)'}
                          </div>
                          <div className="space-y-1">
                            {options.map((text, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  const newS = [...studentsData];
                                  const pMap = colMapping.periods[editingStudent.period];
                                  newS[editingStudent.idx] = {...newS[editingStudent.idx], [pMap.comment]: text};
                                  setStudentsData(newS);
                                  showToast("Đã chọn nhận xét môn học");
                                }}
                                className="w-full text-left p-3 rounded-xl border border-gray-100 text-[11px] hover:border-blue-300 hover:bg-blue-50/50 transition-all leading-relaxed"
                              >
                                {text}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Năng lực</h4>
                    <div className="space-y-1">
                      {[...bankCompetencies.good.slice(0, 3), ...bankCompetencies.fair.slice(0, 2)].map((text, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const newS = [...studentsData];
                            const pMap = colMapping.periods[editingStudent.period];
                            const current = newS[editingStudent.idx][pMap.comment] || "";
                            newS[editingStudent.idx] = {
                              ...newS[editingStudent.idx], 
                              [pMap.comment]: current ? `${current.trim()} ${text}` : text
                            };
                            setStudentsData(newS);
                            showToast("Đã thêm ý năng lực");
                          }}
                          className="w-full text-left p-2 rounded-lg border border-gray-50 text-[10px] hover:border-purple-300 hover:bg-purple-50 transition-all"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Phẩm chất</h4>
                    <div className="space-y-1">
                      {[...bankQualities.good.slice(0, 3), ...bankQualities.fair.slice(0, 2)].map((text, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const newS = [...studentsData];
                            const pMap = colMapping.periods[editingStudent.period];
                            const current = newS[editingStudent.idx][pMap.comment] || "";
                            newS[editingStudent.idx] = {
                              ...newS[editingStudent.idx], 
                              [pMap.comment]: current ? `${current.trim()} ${text}` : text
                            };
                            setStudentsData(newS);
                            showToast("Đã thêm ý phẩm chất");
                          }}
                          className="w-full text-left p-2 rounded-lg border border-gray-50 text-[10px] hover:border-amber-300 hover:bg-amber-50 transition-all"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {personalComments.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-2">
                        <Heart size={10} fill="currentColor" />
                        Thư viện cá nhân
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Tìm nhanh..."
                            value={personalSearch}
                            onChange={e => setPersonalSearch(e.target.value)}
                            className="text-[10px] pl-6 pr-6 py-1 rounded-full border border-gray-100 focus:border-pink-200 outline-none w-36 transition-all"
                          />
                          {personalSearch && (
                            <button 
                              onClick={() => setPersonalSearch("")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>
                        <select 
                          value={personalCategoryFilter}
                          onChange={e => setPersonalCategoryFilter(e.target.value)}
                          className="text-[10px] p-1 rounded-full border border-gray-100 bg-white"
                        >
                          {personalCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredPersonal.map((item, i) => (
                        <div key={item.id} className="relative group">
                          {editingPersonalId === item.id ? (
                            <div className="p-2 border border-pink-300 rounded-xl bg-white space-y-2">
                              <input 
                                type="text"
                                value={item.category}
                                onChange={(e) => updatePersonalComment(item.id, item.text, e.target.value)}
                                className="text-[8px] font-bold uppercase text-pink-400 w-full outline-none"
                              />
                              <textarea
                                value={item.text}
                                onChange={(e) => updatePersonalComment(item.id, e.target.value, item.category)}
                                className="w-full text-[10px] outline-none resize-none h-16 leading-tight"
                              />
                              <button 
                                onClick={() => setEditingPersonalId(null)}
                                className="w-full py-1 bg-pink-500 text-white text-[9px] font-bold rounded-lg"
                              >
                                Xong
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                const newS = [...studentsData];
                                const pMap = colMapping.periods[editingStudent.period];
                                newS[editingStudent.idx] = {
                                  ...newS[editingStudent.idx], 
                                  [pMap.comment]: item.text
                                };
                                setStudentsData(newS);
                                showToast("Đã chọn từ thư viện cá nhân");
                              }}
                              className="w-full h-full text-left p-3 rounded-xl border-2 border-indigo-400 bg-white text-[10px] hover:border-indigo-600 hover:bg-indigo-50/30 transition-all leading-tight relative shadow-sm"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="text-pink-400 text-[8px] font-bold uppercase opacity-60">{item.category}</div>
                                <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full text-[7px] font-black border border-indigo-100">
                                  <User size={8} /> Cá nhân
                                </div>
                              </div>
                              <div className="text-gray-700">{item.text}</div>
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingPersonalId(item.id);
                                  }}
                                  className="bg-white shadow-sm p-1 rounded-full text-blue-400 hover:text-blue-600"
                                  title="Sửa"
                                >
                                  <Edit3 size={8} />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deletePersonalComment(item.id);
                                  }}
                                  className="bg-white shadow-sm p-1 rounded-full text-red-400 hover:text-red-600"
                                  title="Xóa"
                                >
                                  <Trash2 size={8} />
                                </button>
                              </div>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setEditingStudent(null)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100"
                  >
                    Xong
                  </button>
                  <button 
                    onClick={handleSingleRegenerate}
                    disabled={isRegeneratingSingle}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all disabled:opacity-50"
                  >
                    {isRegeneratingSingle ? (
                      <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Wand2 size={14} />
                    )}
                    Gợi ý AI mới
                  </button>
                  <button 
                    onClick={() => {
                      const pMap = colMapping.periods[editingStudent.period];
                      const comment = studentsData[editingStudent.idx][pMap.comment];
                      if (comment) savePersonalComment(comment, `${subject} - ${editingStudent.period}`);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-pink-50 text-pink-600 border border-pink-100 rounded-xl font-bold text-xs hover:bg-pink-100 transition-all"
                  >
                    <Heart size={14} fill={personalComments.some(c => c.text === (studentsData[editingStudent.idx][colMapping.periods[editingStudent.period].comment] || "")) ? "currentColor" : "none"} />
                    Lưu vào thư viện
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const newS = [...studentsData];
                    const pMap = colMapping.periods[editingStudent.period];
                    newS[editingStudent.idx] = {...newS[editingStudent.idx], [pMap.comment]: ""};
                    setStudentsData(newS);
                  }}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Xóa trắng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showingSettings && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setShowingSettings(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] bg-white rounded-3xl shadow-2xl z-[160] flex flex-col max-h-[90vh] overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Settings size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Cài đặt hệ thống</h3>
                    <p className="text-xs text-indigo-100">Cấu hình API Key và các tùy chọn AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowingSettings(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 text-white p-2 rounded-xl">
                      <Key size={20} />
                    </div>
                    <h4 className="font-bold text-indigo-900">Thiết lập GEMINI_API_KEY</h4>
                  </div>
                  
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    Tính năng AI giúp viết nhận xét tự động đòi hỏi phải có <b>Khóa API Gemini</b>. 
                    Dưới đây là hướng dẫn quan trọng để thiết lập khóa này vào môi trường ứng dụng:
                  </p>

                  <div className="space-y-5 pt-2">
                    <div className="flex gap-4 items-start bg-white p-3 rounded-2xl border border-indigo-100">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Vị trí cài đặt hệ thống</p>
                        <p className="text-[11px] text-indigo-700 leading-relaxed">
                          Tìm biểu tượng <b>Bánh răng (Settings)</b> ở <span className="bg-amber-100 px-1 rounded font-bold text-amber-800">góc dưới bên trái</span> của màn hình làm việc (thanh menu dọc của nền tảng).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white p-3 rounded-2xl border border-indigo-100">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Tab Secrets & Biến môi trường</p>
                        <p className="text-[11px] text-indigo-700 leading-relaxed">
                          Chọn tab <b>"Secrets"</b> ở trên cùng thanh điều hướng của bảng Settings hiện lên.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border-2 border-indigo-200 shadow-sm relative">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-indigo-200">3</div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                          Nhập Key & Value
                        </p>
                        <p className="text-[11px] text-indigo-700 leading-relaxed">
                          Nhấn nút <b>"Add Secret"</b>: <br/>
                          - Ô <b>Key</b>: Nhập chính xác <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-black text-indigo-800 border border-indigo-200">GEMINI_API_KEY</code><br/>
                          - Ô <b>Value</b>: Dán mã khóa API (lấy từ Google AI Studio) của bạn vào.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-blue-600 p-5 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                        <Save size={64} />
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 shadow-lg">4</div>
                      <div className="space-y-2 relative z-10">
                         <p className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                           Bước quan trọng nhất: LƯU & DEPLOY
                         </p>
                         <p className="text-[11px] text-blue-50 text-balance leading-relaxed">
                           Cuộn xuống dưới cùng của bảng Secrets và nhấn nút <b className="bg-white text-green-600 px-2 rounded">SAVE</b> (Màu xanh). <br/>
                           Sau đó, một thông báo xuất hiện, nhấn tiếp nút <b className="bg-white text-blue-600 px-2 rounded">DEPLOY</b> để cập nhật hệ thống.
                         </p>
                         <div className="mt-2 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white text-[10px] font-medium flex gap-2 items-center">
                            <RefreshCw size={14} className="shrink-0 animate-[spin_4s_linear_infinite]" />
                            Hệ thống sẽ tải lại một lát, sau đó AI sẽ hoạt động bình thường.
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl space-y-4">
                   <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Tiện ích khác</h4>
                   <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => {
                          if (confirm("Xóa toàn bộ dữ liệu mẫu và bản thảo hiện tại?")) {
                            localStorage.removeItem('report_helper_current_draft');
                            window.location.reload();
                          }
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3 text-gray-700 font-semibold group-hover:text-red-700 text-sm">
                          <RotateCcw size={16} />
                          Xóa bản thảo & Tải lại ứng dụng
                        </div>
                        <ChevronDown size={14} className="-rotate-90 text-gray-300" />
                      </button>
                   </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-center">
                <button 
                  onClick={() => setShowingSettings(false)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100"
                >
                  Đóng cài đặt
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showingHelp && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setShowingHelp(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] bg-white rounded-3xl shadow-2xl z-[160] flex flex-col max-h-[90vh] overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hướng dẫn sử dụng</h3>
                    <p className="text-xs text-blue-100">Làm chủ công cụ tạo nhận xét tự động trong 1 phút</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowingHelp(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Tải file Excel báo cáo</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Xuất file danh sách điểm từ VnEdu hoặc SMAS (thường là file báo cáo định kỳ). Kéo thả trực tiếp vào mục <b>"Tải bảng điểm"</b>.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Ánh xạ cột dữ liệu</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Hệ thống sẽ tự nhận diện. Nếu sai, bạn hãy chọn lại các cột <b>Họ tên</b>, <b>Điểm</b> và <b>Nhận xét</b> tương ứng trong mục cấu hình.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Tùy chỉnh nội dung</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Chọn <b>Môn học</b> và <b>Khối lớp</b>. Sử dụng <b>AI Gemini</b> để có nhận xét tự nhiên hơn hoặc dùng thư viện có sẵn.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Tạo & Chỉnh sửa nhanh</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Nhấn <b>"Tạo nhận xét tự động"</b>. Bạn có thể sửa trực tiếp nội dung trên bảng hoặc mở thư viện chi tiết để chọn câu yêu thích.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">5</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Thư viện cá nhân</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Lưu lại các câu tâm đắc vào thư viện riêng bằng biểu tượng <b>Trái tim</b> để tái sử dụng cho các lớp khác.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0">6</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Xuất kết quả</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Nhấn <b>"Lưu file"</b> để ghi đè vào file gốc hoặc <b>"Xuất riêng"</b> để lấy danh sách nhận xét sạch sẽ gửi cho nhà trường.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
                  <Star className="text-amber-500 shrink-0" size={18} fill="currentColor" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-800">Mẹo nhỏ:</h5>
                    <p className="text-[11px] text-amber-700 leading-relaxed mt-1">
                      Hãy sử dụng tính năng <b>"Lưu ánh xạ"</b> sau khi cấu hình xong các cột. Lần sau tải file cùng định dạng, bạn chỉ cần nhấn <b>"Tải mẫu"</b> là xong ngay!
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
                      <Key className="text-white" size={24} />
                    </div>
                    <div>
                      <h5 className="text-base font-bold text-indigo-900">Cách kích hoạt AI thông minh (Gemini)</h5>
                      <p className="text-[11px] text-indigo-600 font-medium">Cần thiết lập khóa API để sử dụng tính năng viết tự động</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="bg-white p-3 rounded-2xl border border-indigo-100 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                        <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-tight">Mở Settings gốc</span>
                      </div>
                      <p className="text-[10px] text-indigo-600 leading-relaxed">
                        Nhấn biểu tượng <b>Bánh răng</b> ở góc dưới bên trái màn hình nền tảng.
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-indigo-100 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                        <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-tight">Thêm Secret</span>
                      </div>
                      <p className="text-[10px] text-indigo-600 leading-relaxed">
                        Vào tab <b>"Secrets"</b>, nhấn <b>"Add Secret"</b>.
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-indigo-100 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                        <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-tight">Điền Key</span>
                      </div>
                      <p className="text-[10px] text-indigo-600 leading-relaxed">
                        Key: <code className="bg-indigo-100 px-1 rounded font-black">GEMINI_API_KEY</code>. <br/>
                        Value: Dán mã API bạn có.
                      </p>
                    </div>

                    <div className="bg-blue-600 p-3 rounded-2xl space-y-2 shadow-lg shadow-blue-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white text-blue-600 text-[11px] flex items-center justify-center font-bold">4</span>
                        <span className="text-[11px] font-bold text-white uppercase tracking-tight">Lưu & Deploy</span>
                      </div>
                      <p className="text-[10px] text-blue-50 leading-relaxed font-medium">
                        Bắt buộc: Nhấn <b>SAVE</b> (màu xanh) và nhấn <b>DEPLOY</b> sau đó.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-center">
                  <button 
                    onClick={() => setShowingHelp(false)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Tôi đã hiểu, bắt đầu thôi!
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bank Management Modal */}
      <AnimatePresence>
        {managingLibrary && (
          <>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setManagingLibrary(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 bg-white rounded-3xl shadow-2xl z-[110] flex flex-col overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quản lý thư viện nhận xét</h3>
                    <p className="text-xs text-blue-100">Chỉnh sửa nội dung nhận xét tự động của bạn</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (confirm("Khôi phục thư viện về mặc định ban đầu? Mọi chỉnh sửa của bạn sẽ bị xóa.")) {
                        setBankSubjects(ALL_SUBJECTS_BANK);
                        setBankCompetencies({ good: competenciesGood, fair: competenciesFair, poor: competenciesPoor });
                        setBankQualities({ good: qualitiesGood, fair: qualitiesFair, poor: qualitiesPoor });
                        localStorage.removeItem('report_helper_comment_bank');
                        showToast("Đã khôi phục mặc định!");
                      }
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    <RotateCcw size={16} />
                    Mặc định
                  </button>
                  <button 
                    onClick={() => {
                      saveBankToLocal(bankCompetencies, bankQualities, bankSubjects);
                      setManagingLibrary(false);
                      showToast("Đã lưu thay đổi thư viện!");
                    }}
                    className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Save size={18} />
                    Lưu & Đóng
                  </button>
                  <button 
                    onClick={() => setManagingLibrary(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-grow flex overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-gray-50 border-r border-gray-100 overflow-y-auto p-4 flex flex-col gap-1">
                  <div className="mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Loại thư viện</span>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-xl mx-2 mb-6 shadow-inner">
                    <button
                      onClick={() => setBankPeriodType("regular")}
                      className={cn(
                        "flex-grow py-2 rounded-lg text-[10px] font-bold transition-all relative z-10",
                        bankPeriodType === "regular" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Hằng kỳ
                    </button>
                    <button
                      onClick={() => setBankPeriodType("yearEnd")}
                      className={cn(
                        "flex-grow py-2 rounded-lg text-[10px] font-bold transition-all relative z-10",
                        bankPeriodType === "yearEnd" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Cuối năm
                    </button>
                  </div>

                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Môn học</span>
                  {Object.keys(bankSubjects).map(sub => (
                    <div key={sub} className="flex items-center gap-1 group">
                      <button
                        onClick={() => setSubject(sub)}
                        className={cn(
                          "flex-grow text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between",
                          subject === sub ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
                        )}
                      >
                        <span className="truncate">{sub}</span>
                        {subject === sub && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Xóa toàn bộ thư viện cho môn ${sub}?`)) {
                            const newBanks = { ...bankSubjects };
                            delete newBanks[sub];
                            setBankSubjects(newBanks);
                            if (subject === sub) setSubject(Object.keys(newBanks)[0] || "__personal__");
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {isAddingSubject ? (
                    <div className="px-3 py-1">
                      <input 
                        autoFocus
                        value={newSubjectName}
                        onChange={e => setNewSubjectName(e.target.value)}
                        onBlur={() => { if(!newSubjectName.trim()) setIsAddingSubject(false); }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const clean = newSubjectName.trim();
                            if (clean && !bankSubjects[clean]) {
                              setBankSubjects({...bankSubjects, [clean]: { general: { excellent: [], good: [], fair: [], poor: [] } }});
                              setSubject(clean);
                              setNewSubjectName("");
                              setIsAddingSubject(false);
                            }
                          }
                          if (e.key === 'Escape') setIsAddingSubject(false);
                        }}
                        className="w-full text-xs p-1.5 border border-blue-200 rounded outline-none focus:ring-1 focus:ring-blue-300"
                        placeholder="Tên môn mới..."
                      />
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsAddingSubject(true)}
                      className="mx-3 my-1 py-1 px-3 border border-dashed border-gray-300 rounded-lg text-[10px] font-bold text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-1"
                    >
                      <Plus size={10} />
                      Thêm môn học mới
                    </button>
                  )}
                  <div className="mt-6 mb-2 pt-4 border-t border-gray-200">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Phần bổ trợ</span>
                  </div>
                  <button
                    onClick={() => setSubject("__competencies__")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      subject === "__competencies__" ? "bg-purple-100 text-purple-700 shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
                    )}
                  >
                    Năng lực
                  </button>
                  <button
                    onClick={() => setSubject("__qualities__")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      subject === "__qualities__" ? "bg-amber-100 text-amber-700 shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
                    )}
                  >
                    Phẩm chất
                  </button>
                  <button
                    onClick={() => setSubject("__personal__")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                      subject === "__personal__" ? "bg-pink-100 text-pink-700 shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Heart size={14} className={subject === "__personal__" ? "fill-pink-500 text-pink-500" : "text-gray-400"} />
                      <span>Thư viện cá nhân</span>
                    </div>
                  </button>
                </div>

                {/* Editor Content */}
                <div className="flex-grow overflow-y-auto p-8 bg-white">
                  {subject === "__personal__" ? (
                    <div className="max-w-4xl space-y-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-pink-100 text-pink-600">
                            <Heart size={24} fill="currentColor" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">Thư viện cá nhân</h4>
                            <p className="text-sm text-gray-500">Phân loại và tìm kiếm các nhận xét tâm đắc của bạn</p>
                          </div>
                        </div>
                         <div className="flex gap-2">
                          <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder="Tìm nội dung hoặc nhóm..."
                              value={personalSearch}
                              onChange={e => setPersonalSearch(e.target.value)}
                              className="pl-10 pr-10 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-100 outline-none text-sm w-64 transition-all"
                            />
                            {personalSearch && (
                              <button 
                                onClick={() => setPersonalSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                          <select 
                            value={personalCategoryFilter}
                            onChange={e => setPersonalCategoryFilter(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-gray-100 text-sm"
                          >
                            {personalCategories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* New Personal Comment Form */}
                      <div className="bg-pink-50/30 p-6 rounded-3xl border border-pink-100/50 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <PlusCircle size={16} className="text-pink-400" />
                          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Tạo nhận xét mẫu mới</span>
                        </div>
                        <div className="flex gap-4">
                          <textarea 
                            value={newPersonalText}
                            onChange={e => setNewPersonalText(e.target.value)}
                            placeholder="Nhập nội dung mẫu nhận xét của bạn vào đây..."
                            className="flex-grow p-4 bg-white border border-pink-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-200 outline-none h-24 resize-none transition-all"
                          />
                          <div className="flex flex-col gap-3 w-56">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-pink-400 uppercase ml-1 tracking-tight">Phân nhóm</label>
                              <input 
                                type="text"
                                value={newPersonalCategory}
                                onChange={e => setNewPersonalCategory(e.target.value)}
                                placeholder="VD: Toán, Khen ngợi..."
                                className="w-full p-2.5 bg-white border border-pink-100 rounded-xl text-xs outline-none focus:border-pink-300"
                              />
                            </div>
                            <button 
                              onClick={() => {
                                if (!newPersonalText.trim()) return;
                                savePersonalComment(newPersonalText, newPersonalCategory || "Chung");
                                setNewPersonalText("");
                                setNewPersonalCategory("Chung");
                              }}
                              disabled={!newPersonalText.trim()}
                              className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              <Save size={14} />
                              Lưu vào thư viện
                            </button>
                          </div>
                        </div>
                      </div>

                      {personalComments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                          <Heart size={48} className="text-gray-200 mb-4" />
                          <p className="text-gray-400 font-medium">Bạn chưa lưu nhận xét nào</p>
                          <p className="text-[10px] text-gray-300 mt-1">Sử dụng biểu tượng Trái tim để lưu lại bài viết của bạn</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {filteredPersonal.map((item) => (
                            <div 
                              key={item.id} 
                              className={cn(
                                "flex gap-4 group items-start p-4 rounded-3xl border-2 transition-all",
                                aiConfig.foundationalComments?.includes(item.text) 
                                  ? "bg-purple-50 border-purple-500 ring-4 ring-purple-100" 
                                  : "bg-white border-indigo-400 shadow-sm shadow-indigo-50"
                              )}
                            >
                              <div className="flex-grow space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[9px] font-black border border-indigo-100">
                                      <User size={10} />
                                      CÁ NHÂN
                                    </div>
                                    <input 
                                      type="text"
                                      value={item.category}
                                      onChange={(e) => updatePersonalComment(item.id, item.text, e.target.value)}
                                      className="text-[10px] font-black uppercase text-pink-400 bg-pink-50/50 border border-pink-100 px-2 py-0.5 rounded-full outline-none focus:border-pink-200"
                                      placeholder="Nhóm..."
                                    />
                                  </div>
                                  <button
                                    onClick={() => {
                                      const current = aiConfig.foundationalComments || [];
                                      if (current.includes(item.text)) {
                                        setAIConfig(prev => ({ ...prev, foundationalComments: current.filter(t => t !== item.text) }));
                                      } else if (current.length < 3) {
                                        setAIConfig(prev => ({ ...prev, foundationalComments: [...current, item.text] }));
                                      }
                                    }}
                                    className={cn(
                                      "flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-bold transition-all border",
                                      aiConfig.foundationalComments?.includes(item.text)
                                        ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                                        : "bg-white border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200"
                                    )}
                                  >
                                    {aiConfig.foundationalComments?.includes(item.text) ? <CheckCircle size={10} /> : <Sparkles size={10} />}
                                    Làm mẫu AI
                                  </button>
                                </div>
                                <textarea
                                  value={item.text}
                                  onChange={(e) => updatePersonalComment(item.id, e.target.value, item.category)}
                                  className="w-full bg-transparent text-sm outline-none resize-none h-20 transition-all leading-relaxed"
                                />
                              </div>
                              <button 
                                onClick={() => deletePersonalComment(item.id)}
                                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                title="Xóa nhận xét"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : subject === "__competencies__" || subject === "__qualities__" ? (
                    <div className="max-w-4xl space-y-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                          "p-3 rounded-2xl",
                          subject === "__competencies__" ? "bg-purple-100 text-purple-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {subject === "__competencies__" ? <Users size={24} /> : <Star size={24} />}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {subject === "__competencies__" ? "Thư viện Năng lực" : "Thư viện Phẩm chất"}
                          </h4>
                          <p className="text-sm text-gray-500">Các câu bổ trợ sẽ được ghép vào sau nhận xét môn học</p>
                        </div>
                      </div>

                      {(["good", "fair", "poor"] as const).map(cat => {
                        const list = (subject === "__competencies__" ? bankCompetencies[cat] : bankQualities[cat]) || [];
                        return (
                          <div key={cat} className="space-y-4">
                            <h5 className={cn(
                              "text-xs font-black uppercase tracking-wider",
                              cat === 'good' ? "text-green-600" : cat === 'fair' ? "text-blue-600" : "text-red-600"
                            )}>
                              Mức {cat === 'good' ? 'Tốt/Đạt' : cat === 'fair' ? 'Trung bình' : 'Cần cố gắng'}
                            </h5>
                            <div className="grid gap-3">
                              {list.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1 group">
                                  <div className="flex gap-2">
                                    <textarea
                                      value={item}
                                      onChange={(e) => {
                                        const newList = [...list];
                                        newList[idx] = e.target.value;
                                        if (subject === "__competencies__") {
                                          setBankCompetencies(prev => ({...prev, [cat]: newList}));
                                        } else {
                                          setBankQualities(prev => ({...prev, [cat]: newList}));
                                        }
                                      }}
                                      className={cn(
                                        "flex-grow p-3 rounded-xl text-sm outline-none resize-none h-20 transition-all border",
                                        aiConfig.foundationalComments?.includes(item)
                                          ? "bg-purple-50 border-purple-300 ring-2 ring-purple-100 focus:bg-white"
                                          : "bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                      )}
                                    />
                                    <div className="flex flex-col gap-2">
                                      <button 
                                        onClick={() => {
                                          const newList = list.filter((_, i) => i !== idx);
                                          if (subject === "__competencies__") {
                                            setBankCompetencies(prev => ({...prev, [cat]: newList}));
                                          } else {
                                            setBankQualities(prev => ({...prev, [cat]: newList}));
                                          }
                                        }}
                                        className="p-2 text-gray-300 hover:text-red-500 transition-all"
                                        title="Xóa"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const current = aiConfig.foundationalComments || [];
                                          if (current.includes(item)) {
                                            setAIConfig(prev => ({ ...prev, foundationalComments: current.filter(t => t !== item) }));
                                          } else if (current.length < 3) {
                                            setAIConfig(prev => ({ ...prev, foundationalComments: [...current, item] }));
                                          }
                                        }}
                                        className={cn(
                                          "p-2 rounded-lg transition-all",
                                          aiConfig.foundationalComments?.includes(item)
                                            ? "text-purple-600 bg-purple-100"
                                            : "text-gray-300 hover:text-purple-500 hover:bg-purple-50"
                                        )}
                                        title="Dùng làm mẫu AI"
                                      >
                                        <Sparkles size={16} />
                                      </button>
                                    </div>
                                  </div>
                                  {aiConfig.foundationalComments?.includes(item) && (
                                    <div className="flex items-center gap-1 text-[8px] font-bold text-purple-500 uppercase px-1">
                                      <Sparkles size={8} /> Đang dùng làm mẫu AI
                                    </div>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const newList = [...list, ""];
                                  if (subject === "__competencies__") {
                                    setBankCompetencies(prev => ({...prev, [cat]: newList}));
                                  } else {
                                    setBankQualities(prev => ({...prev, [cat]: newList}));
                                  }
                                }}
                                className="w-full py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                              >
                                <PlusCircle size={16} />
                                Thêm nhận xét mới
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="max-w-4xl space-y-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-white pb-6 z-10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                            <Book size={24} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">
                              {bankPeriodType === "yearEnd" ? `${subject} - Nhận xét Cuối năm` : subject}
                            </h4>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex gap-1.5">
                                {["1", "2", "3", "4", "5", "general"].map(lvl => (
                                  <button
                                    key={lvl}
                                    onClick={() => setGradeLevel(lvl)}
                                    className={cn(
                                      "px-3 py-1 rounded-full text-[10px] font-bold border transition-all",
                                      gradeLevel === lvl 
                                        ? (bankPeriodType === 'yearEnd' ? "bg-orange-600 border-orange-600 text-white" : "bg-blue-600 border-blue-600 text-white") 
                                        : "bg-white border-gray-200 text-gray-500"
                                    )}
                                  >
                                    {lvl === "general" ? "Chung" : `Khối ${lvl}`}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {(["excellent", "good", "fair", "poor"] as const).map(cat => {
                        const currentBank = bankSubjects[subject] || {};
                        const gradeData = currentBank[gradeLevel] || currentBank["general"] || { excellent: [], good: [], fair: [], poor: [] };
                        
                        let list: string[] = [];
                        if (bankPeriodType === "yearEnd") {
                          const yearEndData = (gradeData as any).yearEnd || { excellent: [], good: [], fair: [], poor: [] };
                          list = yearEndData[cat] || [];
                        } else {
                          list = gradeData[cat] || [];
                        }

                        return (
                          <div key={cat} className="space-y-4">
                            <h5 className={cn(
                              "text-xs font-black uppercase tracking-wider flex items-center gap-2",
                              cat === 'excellent' ? "text-green-600" : cat === 'good' ? "text-blue-600" : cat === 'fair' ? "text-amber-600" : "text-red-600"
                            )}>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                cat === 'excellent' ? "bg-green-500" : cat === 'good' ? "bg-blue-500" : cat === 'fair' ? "bg-amber-500" : "bg-red-500"
                              )} />
                              {cat === 'excellent' ? (bankPeriodType === 'yearEnd' ? 'Hoàn thành tốt (HT tốt)' : 'Hoàn thành tốt (9-10)') : 
                               cat === 'good' ? (bankPeriodType === 'yearEnd' ? 'Hoàn thành - HT (Mức 1)' : 'Khá - Tốt (7-8)') : 
                               cat === 'fair' ? (bankPeriodType === 'yearEnd' ? 'Hoàn thành - HT (Mức 2)' : 'Đạt (5-6)') : 
                               (bankPeriodType === 'yearEnd' ? 'Chưa hoàn thành (CHT)' : 'Cần cố gắng (<5)')}
                            </h5>
                            <div className="grid gap-3">
                              {list.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1 group">
                                  <div className="flex gap-2">
                                    <textarea
                                      value={item}
                                      onChange={(e) => {
                                        const newSubjects = { ...bankSubjects };
                                        const subData = { ...newSubjects[subject] };
                                        const lvlData = { ...subData[gradeLevel] || subData["general"] };
                                        
                                        if (bankPeriodType === "yearEnd") {
                                          const yearEndData = { ...((lvlData as any).yearEnd || { excellent: [], good: [], fair: [], poor: [] }) };
                                          const catData = [...(yearEndData[cat] || [])];
                                          catData[idx] = e.target.value;
                                          yearEndData[cat] = catData;
                                          (lvlData as any).yearEnd = yearEndData;
                                        } else {
                                          const catData = [...(lvlData[cat] || [])];
                                          catData[idx] = e.target.value;
                                          lvlData[cat] = catData;
                                        }
                                        
                                        subData[gradeLevel] = lvlData;
                                        newSubjects[subject] = subData;
                                        setBankSubjects(newSubjects);
                                      }}
                                      className={cn(
                                        "flex-grow p-3 rounded-xl text-sm outline-none resize-none h-20 transition-all border",
                                        aiConfig.foundationalComments?.includes(item)
                                          ? "bg-purple-50 border-purple-300 ring-2 ring-purple-100 focus:bg-white"
                                          : "bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                      )}
                                    />
                                    <div className="flex flex-col gap-2">
                                      <button 
                                        onClick={() => {
                                          const newSubjects = { ...bankSubjects };
                                          const subData = { ...newSubjects[subject] };
                                          const lvlData = { ...subData[gradeLevel] || subData["general"] };
                                          
                                          if (bankPeriodType === "yearEnd") {
                                            const yearEndData = { ...((lvlData as any).yearEnd || { excellent: [], good: [], fair: [], poor: [] }) };
                                            yearEndData[cat] = yearEndData[cat].filter((_: any, i: number) => i !== idx);
                                            (lvlData as any).yearEnd = yearEndData;
                                          } else {
                                            lvlData[cat] = (lvlData[cat] || []).filter((_: any, i: number) => i !== idx);
                                          }

                                          subData[gradeLevel] = lvlData;
                                          newSubjects[subject] = subData;
                                          setBankSubjects(newSubjects);
                                        }}
                                        className="p-2 text-gray-300 hover:text-red-500 transition-all"
                                        title="Xóa"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const current = aiConfig.foundationalComments || [];
                                          if (current.includes(item)) {
                                            setAIConfig(prev => ({ ...prev, foundationalComments: current.filter(t => t !== item) }));
                                          } else if (current.length < 3) {
                                            setAIConfig(prev => ({ ...prev, foundationalComments: [...current, item] }));
                                          }
                                        }}
                                        className={cn(
                                          "p-2 rounded-lg transition-all",
                                          aiConfig.foundationalComments?.includes(item)
                                            ? "text-purple-600 bg-purple-100"
                                            : "text-gray-300 hover:text-purple-500 hover:bg-purple-50"
                                        )}
                                        title="Dùng làm mẫu AI"
                                      >
                                        <Sparkles size={16} />
                                      </button>
                                    </div>
                                  </div>
                                  {aiConfig.foundationalComments?.includes(item) && (
                                    <div className="flex items-center gap-1 text-[8px] font-bold text-purple-500 uppercase px-1">
                                      <Sparkles size={8} /> Đang dùng làm mẫu AI
                                    </div>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const newSubjects = { ...bankSubjects };
                                  if (!newSubjects[subject]) newSubjects[subject] = {};
                                  const subData = { ...newSubjects[subject] };
                                  const lvlData = { ...(subData[gradeLevel] || subData["general"] || { excellent: [], good: [], fair: [], poor: [] }) };

                                  if (bankPeriodType === "yearEnd") {
                                    const yearEndData = { ...((lvlData as any).yearEnd || { excellent: [], good: [], fair: [], poor: [] }) };
                                    yearEndData[cat] = [...(yearEndData[cat] || []), ""];
                                    (lvlData as any).yearEnd = yearEndData;
                                  } else {
                                    lvlData[cat] = [...(lvlData[cat] || []), ""];
                                  }

                                  subData[gradeLevel] = lvlData;
                                  newSubjects[subject] = subData;
                                  setBankSubjects(newSubjects);
                                }}
                                className={cn(
                                  "w-full py-3 border-2 border-dashed rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all",
                                  bankPeriodType === 'yearEnd' 
                                    ? "border-orange-100 text-orange-400 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50"
                                    : "border-gray-100 text-gray-400 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50"
                                )}
                              >
                                <PlusCircle size={16} />
                                Thêm nhận xét {bankPeriodType === 'yearEnd' ? 'cuối năm' : 'mới'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <GraduationCap size={16} />
            </div>
            <span className="text-sm font-bold text-gray-700">AutoComment VnEdu</span>
          </div>
          <div className="flex flex-col md:items-end items-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span>Tác giả:</span>
              <span className="text-gray-800 font-bold">Lục Minh Sơn</span>
            </div>
            <a href="mailto:msontl20@gmail.com" className="text-[10px] text-blue-500 hover:underline font-medium">
              msontl20@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
