export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 py-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 sm:p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl max-w-xl sm:max-w-2xl w-full mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <GraduationCap className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-white mb-4 sm:mb-6" />
        </motion.div>
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome to 競馬AI
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link 
            href="/info" 
            className="inline-block px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration:300 shadow-md hover:shadow-lg"
          >
            Go to the Info Page
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 text-white text-center"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-4 animate-bounce" />
        <p className="text-base sm:text-lg font-semibold">Learn More About Our Site</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 p-4 sm:p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl max-w-xl sm:max-w-2xl w-full mx-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">About Our Site</h2>
        <p className="text-white text-base sm:text-lg leading-relaxed">
          競馬AIへようこそ。競馬AIは機械学習や人工知能（AI）の技術を利用して、競馬の予測や分析を行うシステムです。競馬は多くの要因（馬の能力、騎手の技術、コースのコンディション、天気など）が結果に影響を与えるため、競馬AIはそれらのデータを分析し、レースの結果を予測します。競馬AIの目的は、従来の人間の経験や勘に依存した予測を補完し、より正確な判断を行うことです。
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed mt-4">
          競馬AIでどのような情報を用いて予想を行なっているか詳しく知りたい場合は上記の"Go to the Info Page"からinformationページに飛んでください。
        </p>
      </motion.div>
    </div>
  )
}
